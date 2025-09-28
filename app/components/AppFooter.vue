<script setup lang="ts">
const icons = {
  'i-mdi-instagram': '',
  'i-mdi-linkedin': '',
}
</script>

<template>
  <footer class="w-full bg-white dark:bg-[#030712] text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
    <div class="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 py-16 px-6 md:px-20">
      <div class="space-y-4 md:w-1/3">
        <div class="flex gap-2 items-center"><img src="/favicon.svg" alt="hirescript-logo" class="w-8 not-dark:invert lg:block hidden"><span>Hirescript Academy</span></div>
        <p class="text-sm">All rights reserved</p>
        <div class="flex space-x-4 mt-2">
          <a href="https://www.instagram.com/hellohirescript/" target="_blank" rel="noopener noreferrer">
            <UIcon name="i-mdi-instagram" class="w-6 h-6 text-slate-950 dark:text-white hover:text-slate-500 cursor-pointer" />
          </a>
          <a href="https://www.linkedin.com/company/hirescript-app/" target="_blank" rel="noopener noreferrer">
            <UIcon name="i-mdi-linkedin" class="w-6 h-6 text-slate-950 dark:text-white hover:text-slate-500 cursor-pointer" />
          </a>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-12 md:gap-20 md:w-2/3 justify-end">
        <div>
          <h2 class="text-slate-950 dark:text-white font-semibold mb-3">Company</h2>
          <ul class="space-y-2">
            <li><a href="https://blogs.hirescript.tech/blog/1gwFMIcPVs2pzQCSaoik" target="_blank" rel="noopener noreferrer" class="hover:text-slate-500">About us</a></li>
            <li><a href="https://blogs.hirescript.tech/" target="_blank" rel="noopener noreferrer" class="hover:text-slate-500">Blog</a></li>
            <li><a href="mailto:hirescript.work@gmail.com" target="_blank" rel="noopener noreferrer" class="hover:text-slate-500">Contact us</a></li>
            <li><a href="https://www.hirescript.tech/#/jobs" target="_blank" rel="noopener noreferrer" class="hover:text-slate-500">Jobs</a></li>
          </ul>
        </div>
        <div>
          <h2 class="text-slate-950 dark:text-white font-semibold mb-3">Support</h2>
          <ul class="space-y-2">
            <li><a href="mailto:hirescript.work@gmail.com" target="_blank" rel="noopener noreferrer" class="hover:text-slate-500">Help center</a></li>
            <li><a href="https://www.hirescript.tech/#/privacy" target="_blank" rel="noopener noreferrer" class="hover:text-slate-500">Terms of service</a></li>
            <li><a href="https://www.hirescript.tech/#/use" target="_blank" rel="noopener noreferrer" class="hover:text-slate-500">Terms of Use</a></li>
          </ul>
        </div>

      </div>
    </div>
  </footer>
</template>
