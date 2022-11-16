<template>
  <header role="banner">
    <router-link class="exit" :to="{ name: 'home' }">
          خروج
        </router-link>
  </header>

  <nav role='navigation'>
    <ul class="main">
      <li>
        <!-- params: { username: 'erina' }  -->
        <router-link :to="{ name: 'home' }">
          صفحه اصلی
        </router-link>
      </li>
      <li>
        <!-- params: { username: 'erina' }  -->
        <router-link :to="{ name: 'suppliers' }">
          پذیرندگان
        </router-link>
      </li>
       <li>
        <router-link :to="{ name: 'wallets' }">
          کیف پول
        </router-link>
      </li>
    <!--  <li>
        <router-link :to="{ name: 'customers' }">
          مشتریان
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'products' }">
          محصولات
        </router-link>
      </li> -->
    </ul>
  </nav>

  <main role="main">
    <slot name="main"></slot>
  </main>

</template>

<script>
export default {
  name: 'Container',
  props: {
    msg: String
  }
}

</script>
