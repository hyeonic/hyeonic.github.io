<template lang="html">
  <div>
    
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/해시태그/#${tag}`}">
      #{{tag}} 
    </router-link>
  </div>
</template>