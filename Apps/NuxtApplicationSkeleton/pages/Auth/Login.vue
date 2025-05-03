<template>
  <div class="alpha-login-root">
      <div class="alpha-login-container">
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center">
          <img />
          {{  $t('MyCompanyName') }}
        </div>
        <div style="padding: 12px">
          <h3> {{ $t('Sign in to your accound') }}</h3>
          <q-form>
            <p>{{ $t('Your email') }}</p>
            <q-input dense  v-model="userName">

            </q-input>
            <p>{{ $t('Password') }}</p>
            <q-input dense v-model="password" type="password">
            </q-input>
          </q-form>
          <div style="display:flex; width: 100%; justify-content: space-between;">
            <q-checkbox v-model="rememberMe" label="Remember me" />

            <NuxtLink to="/auth/forgotpassword" class="text-primary">
              {{ $t('Forgot password') }}
            </NuxtLink>
          </div>
          <q-btn dense class="q-mt-md" label="Login" color="primary" @click="login()" />

          <p> {{ $t("Don't have an account yet?") }}</p> <NuxtLink to="/auth/register" class="text-primary">
            {{ $t('Create an account') }}
          </NuxtLink>
        </div>
      </div>    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseServiceProvider } from 'webbuilderalphautils'
import { AuthenticationService } from 'webbuilderalphautils/services/Auth/AuthenticationService.ts'

const userName = ref('')
const password = ref('')
const rememberMe = ref(false)

const service = BaseServiceProvider.ServiceWithContext<AuthenticationService>('AuthenticationService', 0)

const route = useRoute()
console.log(route.redirectedFrom)
function login() {
  if(!userName.value || !password.value) {
    //todo handle error
    return
  }
  service.AuthenticateOAuth2(userName.value, password.value, () => {
    console.log('login success')
    return navigateTo(route.redirectedFrom)
  }), () =>{
    //todo handle error
  }
}


</script>

<style scoped lang="scss">

.alpha-login-root{
  background-color: theme('colors.primary-dark');
  height: 100%;
  width:100%;

  .alpha-login-container{
    position:absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 400px;
    height: 600px;
    max-width: 400px;
    max-height: 800px;
    background-color: theme('colors.primary-white');
    padding: 10px;
  }

}

</style>
