<script setup lang="ts">
defineProps({
    course: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <div class="border rounded overflow-hidden border-gray-300">
        <div class="h-[180px] overflow-hidden">
            <img :src="course.image" class="w-full h-full object-cover" alt=""> // connect
        </div>
        <div class="flex flex-col gap-y-3 p-4">
            <div>{{ course.title }}</div>
            <div class="text-sm text-gray-600">{{ course.courseOutline }}</div>
            <div class="text-sm text-gray-600">Registered Students: {{ course.registeredStudents.length }}</div>
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <icon name="material-symbols:star-rate-rounded" class="size-6 text-amber-500" />4.7
                </div>
                <div class=" flex items-center gap-2 text-primary"><a
                        :href="`https://www.hirescript.tech/#/courses/${course.id}`" target="_blank"
                        rel="noopener noreferrer" class="flex items-center gap-2 text-primary hover:underline">
                        Explore more
                        <icon name="material-symbols:arrow-forward" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>