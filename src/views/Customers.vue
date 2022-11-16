<template>
    <Container msg="Welcome to Your Vue.js App">
        <template v-slot:main>
            <div class="popup" v-if="currentuser" @click.self="currentuser= null">
                <div class="card col-sm-4">
                    <div class="card-header">ویرایش اعتبار کیف پول</div>
                    <div class="card-body">
                        <div class="row mx-0 justify-content-center my-2" v-for="wallet, i in wallets" :key="i">
                            <div class="col-sm-8 row mx-0">
                                <div class="col-sm-4">
                                    <button class="btn btn-block btn-outline-primary"
                                        @click="editBalances(wallet.id, currentuser.id , $refs[`nbalance${wallet.id}`][0].value)">
                                        ویرایش
                                    </button>
                                </div>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" :ref="`nbalance${wallet.id}`">
                                </div>

                            </div>
                            <div class="col-sm-4">
                                {{ wallet.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">مشتریان</div>
                <div class="card-body">
                    <table class="table m-0" dir="rtl">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>نام</td>
                                <td>نام خانوادگی</td>
                                <td>موبایل</td>
                                <td>کد ملی</td>
                                <td>اعتبارها</td>
                                <td>ویرایش اعتبار</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user, i in users" :key="i">
                                <td>{{ i + 1 }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.family }}</td>
                                <td dir="ltr">{{ user.mobile }}</td>
                                <td>{{ user.national_code }}</td>
                                <td>
                                    <div class="row mx-0" v-for="wallet, j in user.customerwallet" :key="j">
                                        <div class="col-sm-6" v-if="wallet.wallet">
                                            {{ wallet.wallet.title }}:
                                        </div>
                                        <div class="col-sm-6">
                                            {{ wallet.balance }}تومان
                                        </div>
                                    </div>
                                </td>
                                <td><button class="btn btn-sm btn-outline-primary" @click="currentuser = user">ویرایش
                                        اعتبار</button></td>
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
            wallets: [],
            users: [],
            title: null,
            currentuser: null,
        }
    },
    mounted() {
        this.getWallets()
        this.getWalletsMain()
    },


    methods: {
        getWallets: function () {
            axios.get('http://188.121.120.190:8400/v1/customer')
                .then(response => response.data)
                .then(result => {
                    this.users = result.users;
                })
        },

        getWalletsMain: function () {
            axios.get('http://188.121.120.190:8400/v1/wallet')
                .then(response => response.data)
                .then(result => {
                    this.wallets = result.wallets;
                })
        },

        logofile: function (e) {
            const logo = e.target.files[0];
            this.preview_img = URL.createObjectURL(logo);
            this.img = logo;
        },

        editBalances: function (wallet_id, customer_id, nbalance) {
            const form = new FormData();
            console.log(nbalance);
            form.append('balance', nbalance);
            form.append('customer_id', customer_id);
            form.append('wallet_id', wallet_id);
            axios.post('http://188.121.120.190:8400/v1/customer/wallet/make', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => response.data)
                .then(result => {
                    if (result)
                        alert('با موفقیت ویرایش شد')
                })

        },

        makeWallet: function () {
            const form = new FormData();
            form.append('title', this.title);
            axios.post('http://188.121.120.190:8400/v1/wallet', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                dat
            })
                .then(response => response.data)
                .then(result => {
                    if (result)
                        this.getWallets();
                })
        },

        removeWallet: function (id) {
            axios.delete(`http://188.121.120.190:8400/v1/wallet/${id}`)
                .then(response => response.data)
                .then(result => {
                    if (result)
                        this.getWallets();
                })
        }
    }
}
</script>

<style scoped>
.popup {
    position: fixed;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: #aaa7;
    left: 0;
    top: 0;
}
</style>