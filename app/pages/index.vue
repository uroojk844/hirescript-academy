<script setup lang="ts">
import HeroImage from "~/assets/images/Hero.svg";
import SubHeroImage from "~/assets/images/SubHero.svg";
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase.config"; 
definePageMeta({
  layout: "home",
});
const courses = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  const querySnapshot = await getDocs(collection(db, "courses"));
  courses.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  loading.value = false;
});

const icons = ["reactjs", "html", "js-official","css" ,"tailwind","python"];
</script>

<template>
  <section class="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    <div class="flex flex-col gap-6 text-center lg:text-left">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
        Learn to code at <span class="text-primary">HireScript Academy</span>
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300">
        "Learn to code and unlock the power to build your own future"
      </p>
      <div>
        <NuxtLink to="/courses/html">
        <UButton class="bg-primary text-white rounded-md dark:text-black sm:px-5 sm:py-2.5">Get started</UButton>
        </NuxtLink>
      </div>
    </div>
    <div class="flex justify-center">
      <img :src="HeroImage" alt="hero-image" class="w-72 sm:w-96 lg:w-[32rem] h-auto object-contain">
    </div>
  </section>

  <section class="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 py-16">
    <h2 class="text-3xl sm:text-4xl font-semibold text-center">
      Your Coding Playground
    </h2>
    <p class="text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center mt-4">Explore, practice and grow your
      skills</p>
    <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-20 mt-12">
      <icon v-for="tech in icons" class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
        :name="`vscode-icons:file-type-${tech}`" />
    </div>
  </section>

  <section class="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 py-16">
    <h2 class="text-3xl sm:text-4xl font-semibold text-center">Explore Hirescript</h2>
    <p class="text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center mt-4">HireScript courses help you master
      coding with practical, hands-on lessons</p>
    <Loader v-if="loading" />
    <div v-else class="grid grid-responsive justify-center justify-items-center gap-6 mt-10">
      <CourseCard v-for="course in courses" :key="course.id"  :course="courses[0]" />
    </div>
  </section>

  <section class="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    <div class="flex justify-center lg:justify-start">
      <img :src="SubHeroImage" alt="hero-image" class="w-72 sm:w-96 lg:w-[32rem] h-auto object-contain">
    </div>
    <div class="flex flex-col gap-6 text-center lg:text-left">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight ">
        The experience of growing with <span class="text-primary">HireScript</span>
      </h2>
      <p class="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300">
        "Learn to code and unlock the power to build your own future"
      </p>
      <div>
        <a href="https://www.hirescript.tech/#/jobs">
          <UButton class="bg-primary text-white rounded-md dark:text-black sm:px-5 sm:py-2.5">Get started </Ubutton>
        </a> 
      </div>
    </div>
  </section>
  <Promote/>

</template>
<style scoped>
.grid-responsive{
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
