import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators , FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnDestroy {

  imageVisible = signal(true);
  private authService = inject(AuthService);
  private router = inject(Router)
  eventImages = [
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900'
  ]
  currentImageIndex = signal(0);
    private imageTimer: ReturnType<typeof setInterval> | undefined;
    private fadeIn?: ReturnType<typeof setInterval> | undefined; 
    private fadeOut?: ReturnType<typeof setInterval> | undefined; 
  constructor() {
    this.imageTimer = setInterval(() => {
      this.changeImage();
    }, 4000);
  }
  changeImage() {
    this.imageVisible.set(false);
    
    this.fadeIn = setTimeout(() => {
      this.currentImageIndex.update((index) => (index + 1) % this.eventImages.length);
    }, 300);
    this.fadeOut = setTimeout(()=>{
      this.imageVisible.set(true);
    }, 400)
  }
  ngOnDestroy(): void {
    if(this.imageTimer){
      clearInterval(this.imageTimer)
    }
    if(this.fadeIn){
      clearInterval(this.fadeIn)
    }
    if(this.fadeOut){
      clearInterval(this.fadeOut)
    }
  }
  submittedUsername = signal("");
  submittedPassword = signal("");
  loginAttempted = signal(false);
  showPassword = signal(false);
  error = signal('');
  isLoading = signal(false);

  loginForm = new FormGroup({
    userName: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      
    ])
  })
  submitLogin(){
    this.loginAttempted.set(true);
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const {userName, password} = this.loginForm.getRawValue();
    this.isLoading.set(true);
    this.authService.loginWithApi(userName ?? '', password ?? '').subscribe({
      next: (response) =>{
        this.authService.logIn();
        this.submittedUsername.set(response.username);
        this.error.set('');
        this.authService.setCurrentUser(response);
        this.authService.saveSession(response);
        this.isLoading.set(false);
        this.router.navigate(['/home']);
      },
      error: ()=>{
        this.error.set('Error. Please Try again');
        this.authService.logOut();
        this.authService.currentUser.set(null);
        this.isLoading.set(false);
      }
    })
  
    const formData = this.loginForm.value;
    this.submittedUsername.set(formData.userName?? '');
    this.submittedPassword.set(formData.password??'');
  }
  passwordShow(){
    this.showPassword.update(value => !value);
  }
  logout(){
    this.authService.logOut();
    this.authService.currentUser.set(null);
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  }
}
