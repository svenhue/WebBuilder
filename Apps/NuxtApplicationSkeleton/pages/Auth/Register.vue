<template>
  <div class="tw-flex tw-min-h-screen tw-bg-dark-page">
    
    <!-- Right side - Register form -->
    <div class="tw-w-full lg:tw-w-1/2 tw-flex tw-items-center tw-justify-center tw-p-6">
      <div class="tw-w-full tw-max-w-md">
        <div class="tw-text-right tw-mb-8">
          <router-link to="/" class="tw-flex tw-items-center tw-justify-end hover:tw-text-purple tw-transition-colors">
            <span class="tw-text-fontwhite tw-text-sm">Back to homepage</span>
            <span class="tw-ml-2 tw-text-purple">→</span>
          </router-link>
        </div>
        
        <h2 class="tw-text-3xl tw-font-bold tw-text-fontwhite tw-mb-2">Create an account</h2>
        <p class="tw-text-brightgrey tw-mb-8">Please enter your details to get started.</p>
        
        <form @submit.prevent="handleRegister" class="tw-space-y-5">
          <!-- Name Fields -->
          <div class="tw-grid tw-grid-cols-2 tw-gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text tw-text-fontwhite">First Name</span>
              </label>
              <input
                v-model="firstName"
                type="text"
                placeholder="John"
                class="input input-bordered tw-w-full tw-bg-dark tw-border-darkgrey tw-text-fontwhite focus:tw-border-purple"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text tw-text-fontwhite">Last Name</span>
              </label>
              <input
                v-model="lastName"
                type="text"
                placeholder="Doe"
                class="input input-bordered tw-w-full tw-bg-dark tw-border-darkgrey tw-text-fontwhite focus:tw-border-purple"
                required
              />
            </div>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text tw-text-fontwhite">Email</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="your@email.com"
              class="input input-bordered tw-w-full tw-bg-dark tw-border-darkgrey tw-text-fontwhite focus:tw-border-purple"
              required
            />
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text tw-text-fontwhite">Password</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="input input-bordered tw-w-full tw-bg-dark tw-border-darkgrey tw-text-fontwhite focus:tw-border-purple"
              required
            />
            <p class="tw-mt-1 tw-text-xs tw-text-brightgrey">Password must be at least 8 characters</p>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text tw-text-fontwhite">Confirm Password</span>
            </label>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              class="input input-bordered tw-w-full tw-bg-dark tw-border-darkgrey tw-text-fontwhite focus:tw-border-purple"
              required
            />
          </div>
          
          <div class="form-control">
            <label class="tw-cursor-pointer label tw-justify-start tw-gap-3">
              <input type="checkbox" v-model="agreeToTerms" class="checkbox checkbox-sm checkbox-purple" required />
              <span class="label-text tw-text-fontwhite">
                I agree to the 
                <a href="#" class="tw-text-purple hover:tw-text-purple/80">Terms of Service</a> 
                and 
                <a href="#" class="tw-text-purple hover:tw-text-purple/80">Privacy Policy</a>
              </span>
            </label>
          </div>
          
          <button class="btn tw-w-full tw-bg-purple hover:tw-bg-purple/90 tw-text-fontwhite tw-border-none">
            Create account
          </button>
          
          <div class="divider tw-text-xs tw-text-brightgrey">OR CONTINUE WITH</div>
          
          <div class="tw-flex tw-gap-3">
            <button type="button" class="btn btn-outline tw-flex-1 tw-gap-2 tw-border-darkgrey tw-text-fontwhite hover:tw-bg-dark hover:tw-border-purple">
              <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button" class="btn btn-outline tw-flex-1 tw-gap-2 tw-border-darkgrey tw-text-fontwhite hover:tw-bg-dark hover:tw-border-purple">
              <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/>
              </svg>
              Apple
            </button>
          </div>
        </form>
        
        <p class="tw-text-sm tw-text-center tw-text-brightgrey tw-mt-8">
          Already have an account? 
          <router-link to="/auth/login" class="tw-text-purple hover:tw-text-purple/80 tw-font-medium">
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);
const router = useRouter();

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }

  console.log('Registration attempt with:', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    agreeToTerms: agreeToTerms.value
  });
  
  // Here you would typically call your registration service
  // For now, we'll just redirect to login
  router.push('/auth/login');
};
</script>

<style scoped>
/* Custom checkbox color */
.checkbox-purple:checked {
  background-color: #7e5bef;
  border-color: #7e5bef;
}

/* Ensure the page takes up full height */
html, body {
  height: 100%;
}
</style>
