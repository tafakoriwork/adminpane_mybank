<template>
    <Container msg="Welcome to Your Vue.js App">
        <template v-slot:main>
            <div class="card">
                <div class="card-header">
                    افزودن کیف پول
                </div>
                <div class="card-body">
                    <div class="row mx-0 justify-content-center">
                        <div class="col-sm-8 my-1">
                            <input type="text" class="form-control text-end" placeholder="نام" v-model="title">
                        </div>
                        <div class="col-sm-8 my-1">
                            <button class="btn btn-primary" @click="makeWallet">
                                ایجاد
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">کیف پول ها</div>
                <div class="card-body">
                    <table class="table m-0" dir="rtl">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>عنوان</td>
                                <td>حذف</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="Wallet, i in Wallets" :key="i">
                                <td>{{ i + 1 }}</td>
                                <td>{{ Wallet.title }}</td>
                                <td ><button v-if="Wallet.id != 1" class="btn btn-sm btn-outline-danger" @click="removeWallet(Wallet.id)">حذف</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
    </Container>
</template>

<script>
import Container from '@/components/Container.vue';
import axios from 'axios'
export default {
    components: { Container },
    data() {
        return {
            Wallets: [],
            title: null,
        }
    },
    mounted() {
        this.getWallets()
    },

    methods: {
        getWallets: function () {
            axios.get('http://188.121.120.190:8400/v1/wallet')
                .then(response => response.data)
                .then(result => {
                    this.Wallets = result.wallets;
                })
        },

        logofile: function (e) {
            const logo = e.target.files[0];
            this.preview_img = URL.createObjectURL(logo);
            this.img = logo;
        },

        makeWallet: function () {
            const form = new FormData();
            form.append('title', this.title);
            axios.post('http://188.121.120.190:8400/v1/wallet',form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => response.data)
                .then(result => {
                    if(result)
                    this.getWallets();
                })
        },

        removeWallet: function (id) {
            axios.delete(`http://188.121.120.190:8400/v1/wallet/${id}`)
                .then(response => response.data)
                .then(result => {
                    if(result)
                    this.getWallets();
                })
        }
    }
}
</script>

<style scoped>

</style>