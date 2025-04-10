<template>
  <div class="min-h-screen flex items-center justify-center bg-dark">
    <div class="w-full max-w-md">
      <!-- Card Container -->
      <div class="bg-fontwhite rounded-lg shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="bg-primary p-6">
          <h2 class="text-2xl font-bold text-fontwhite text-center">Create Account</h2>
          <p class="text-fontwhite text-center opacity-80 mt-1">Join our website builder platform</p>
        </div>

        <!-- Form -->
        <div class="p-8">
          <form @submit.prevent="handleRegister">
            <!-- Name Fields -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-darkgrey mb-2">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="firstName" 
                  class="w-full px-4 py-3 border border-gray-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-darkgrey mb-2">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="lastName" 
                  class="w-full px-4 py-3 border border-gray-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <!-- Email Field -->
            <div class="mb-6">
              <label for="email" class="block text-sm font-medium text-darkgrey mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                class="w-full px-4 py-3 border border-gray-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <!-- Password Fields -->
            <div class="mb-6">
              <label for="password" class="block text-sm font-medium text-darkgrey mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                class="w-full px-4 py-3 border border-gray-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <p class="mt-1 text-xs text-brightgrey">Password must be at least 8 characters</p>
            </div>

            <div class="mb-6">
              <label for="confirmPassword" class="block text-sm font-medium text-darkgrey mb-2">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                v-model="confirmPassword" 
                class="w-full px-4 py-3 border border-gray-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
                <input 
                  type="checkbox" 
                  id="terms" 
                  v-model="agreeToTerms" 
                  class="h-4 w-4 text-primary border-gray-light rounded"
                  required
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="text-darkgrey">
                  I agree to the 
                  <a href="#" class="text-primary hover:underline">Terms of Service</a> 
                  and 
                  <a href="#" class="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>

            <!-- Register Button -->
            <button 
              type="submit" 
              class="w-full bg-primary text-fontwhite py-3 px-4 rounded-md font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Create Account
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-light"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-fontwhite text-darkgrey">Or sign up with</span>
            </div>
          </div>

          <!-- Social Register Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <button 
              type="button" 
              class="flex justify-center items-center py-2.5 px-4 border border-gray-light rounded-md shadow-sm bg-fontwhite hover:bg-gray-light/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <!-- Google SVG here -->
              </svg>
              Google
            </button>
            <button 
              type="button" 
              class="flex justify-center items-center py-2.5 px-4 border border-gray-light rounded-md shadow-sm bg-fontwhite hover:bg-gray-light/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <!-- Facebook SVG here -->
              </svg>
              Facebook
            </button>
          </div>

          <!-- Login Link -->
          <p class="mt-6 text-center text-sm text-darkgrey">
            Already have an account?
            <a href="/auth/login" class="font-medium text-primary hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <p class="mt-6 text-center text-xs text-gray-light">
        &copy; 2025 WebBuilder. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  console.log('Registration attempt with:', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    agreeToTerms: agreeToTerms.value
  })
}
</script>
