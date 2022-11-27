<template lang="html">
  <div>
    
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/hash-tag/#${tag}`}">
      #{{tag}} 
    </router-link>
  </div>
</template>