<template>
  <nav class="nav">
    <router-link to="/zabava">Zabava</router-link>
    <router-link to="/kontakt">Kontakt</router-link>
    <router-link to="/o-nama">O nama</router-link>
    <router-link to="/mesto-okupljanja">Mesto okupljanja</router-link>
    <router-link to="/home">Home</router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #111;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

/* active route styling */
.router-link-active {
  border-bottom: 2px solid #42b883;
}
</style>