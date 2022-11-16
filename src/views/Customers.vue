<template>
    <Container msg="Welcome to Your Vue.js App">
        <template v-slot:main>
            <div class="card" v-if="currentuser">
                <div class="card-header">ویرایش اعتبار کیف پول</div>
                <div class="card-body">
                    <div class="row mx-0 justify-content-center" v-for="cwallet, i in currentuser.customerwallet"
                        :key="i">
                        <div class="col-sm-3">
                            <input type="text" class="form-control" :ref="`nbalance${cwallet.id}`"
                                :value="cwallet.balance">
                        </div>
                        <div class="col-sm-3">
                            {{ cwallet.wallet.title }}
                        </div>
                        <div class="com-sm-3">
                            <button class="btn-block btn-outline primary" @click="editBalances(cwallet.wallet_id, cwallet.customer_id, $refs[`nbalance${cwallet.id}`].value)">
                                ویرایش
                            </button>
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
            users: [],
            title: null,
            currentuser: null,
        }
    },
    mounted() {
        this.getWallets()
    },













    methods: {
        getWallets: function () {
            axios.get('http://188.121.120.190:8400/v1/customer')
                .then(response => response.data)
                .then(result => {
                    this.users = result.users;

                    console.log(result.users[0]);
                })
        },

        logofile: function (e) {
            const logo = e.target.files[0];
            this.preview_img = URL.createObjectURL(logo);
            this.img = logo;
        },

        editBalances: function (wallet_id, customer_id, nbalance) {
            const form = new FormData();
            form.append('balance', nbalance);
            form.append('customer_id', customer_id);
            form.append('wallet_id', wallet_id);
            axios.post('http://188.121.120.190:8400/v1/customer/wallet/make',form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => response.data)
                .then(result => {
                    if(result)
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

</style>