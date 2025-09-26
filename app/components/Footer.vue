<script setup lang="ts">
const icons = {
  'i-mdi-instagram': '',
  'i-mdi-twitter': '',
  'i-mdi-linkedin': '',
  'i-mdi-github': '',
  'i-mdi-send': ''
}
</script>
<template>
  <footer class="max-w-6xl mx-auto dark:bg-black  text-gray-300 py-10 px-6 md:px-20 bg-white">
    <div class=" grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="space-y-4">
        <h1 class=" text-slate-950 dark:text-white font-bold text-lg">HireScript</h1>
        <p class=" text-slate-950 dark:text-white text-sm">All rights reserved</p>
        <div class="flex space-x-3 mt-2">
          <a href="https://www.instagram.com/hellohirescript/" target="_blank" rel="noopener noreferrer">
            <UIcon name="i-mdi-instagram"
              class="w-6 h-6 text-slate-950 dark:text-white cursor-pointer hover:text-slate-500" />
          </a>
          <a href="https://www.linkedin.com/company/hirescript-app/" target="_blank" rel="noopener noreferrer">
          <UIcon name="i-mdi-linkedin"
            class="w-6 h-6 text-slate-950 dark:text-white cursor-pointer hover:text-slate-500" />
          </a>  
        </div>
      </div>
      <div>
        <h2 class=" text-slate-950 dark:text-white font-semibold mb-3">Company</h2>
        <ul class="space-y-2 text-gray-400">
          <a href="https://blogs.hirescript.tech/blog/1gwFMIcPVs2pzQCSaoik" target="_blank" rel="noopener noreferrer"><li class="hover:text-slate-500 cursor-pointer">About us</li></a>
          <a href="https://blogs.hirescript.tech/" target="_blank" rel="noopener noreferrer"><li class="hover:text-slate-500 cursor-pointer">Blog</li></a>
          <a href="mailto:hirescript.work@gmail.com" target="_blank" rel="noopener noreferrer"><li class="hover:text-slate-500 cursor-pointer">Contact us</li></a>
          <a href="https://www.hirescript.tech/#/jobs" target="_blank" rel="noopener noreferrer"><li class="hover:text-slate-500 cursor-pointer">Jobs</li></a>
        </ul>
      </div>
      <div>
        <h2 class=" text-slate-950 dark:text-white font-semibold mb-3">Support</h2>
        <ul class="space-y-2 text-gray-400">
          <a href="mailto:hirescript.work@gmail.com" target="_blank" rel="noopener noreferrer"><li class="hover:text-slate-500 cursor-pointer">Help center</li></a>
          <a href="https://www.hirescript.tech/#/privacy" target="_blank" rel="noopener noreferrer"><li class="hover:text-slate-500 cursor-pointer">Terms of service</li></a>
          <a href="https://www.hirescript.tech/#/use" target="_blank" rel="noopener noreferrer"><li class="hover:text-slate-500 cursor-pointer">Terms of Use</li></a>
        </ul>
      </div>
      <div class="space-y-3">
        <h2 class=" text-slate-950 dark:text-white font-semibold mb-3">Stay up to date</h2>
        <div class="flex border rounded-md  dark:border-gray-500 border-gray-300">
          <input type="email" placeholder="Your email address"
            class="w-full px-4 py-2 rounded-l-md bg-white dark:bg-black text-gray-200 placeholder-gray-400 focus:outline-none" />
          <button class=" px-4 rounded-r flex items-center justify-center">
            <UIcon name="i-mdi-send"
              class="w-6 h-6 text-slate-950 dark:text-white cursor-pointer hover:text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>