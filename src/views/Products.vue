<template>
    <Container msg="Welcome to Your Vue.js App">
        <template v-slot:main>
            <div class="card">
                <div class="card-header">
                    افزودن محصول 
                </div>
                <div class="card-body">
                    <div class="row mx-0 justify-content-center">
                        <div class="col-sm-8 my-1">
                            <input type="text" class="form-control text-end" placeholder="نام" v-model="title">
                        </div>
                        <div class="col-sm-8 my-1">
                            <input type="text" class="form-control text-end" placeholder="شرح" v-model="desc">
                        </div>
                        <div class="col-sm-8 my-1">
                            <input type="text" class="form-control text-end" placeholder="کد" v-model="code">
                        </div>
                        <div class="col-sm-8 my-1">
                            <label >پذیرنده</label>
                           <select class="form-control text-end" v-model="supplier_id">
                            <option :value="supplier.id" v-for="supplier, i in suppliers" :key="i">
                                {{ supplier.title }}
                            </option>
                           </select>
                        </div>
                        
                        <div class="col-sm-8 my-1">
                            <label >کیف پول</label>
                           <select class="form-control text-end"  v-model="wallet_id">
                                <option :value="wallet.id" v-for="wallet, i in wallets" :key="i">
                                    {{ wallet.title }}
                                </option>
                           </select>
                        </div>

                        <div class="col-sm-8 my-1">
                            <button class="btn btn-primary" @click="makeProduct" v-show="title && code && desc && wallet_id && supplier_id">
                                ایجاد
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">محصولات</div>
                <div class="card-body">
                    <table class="table m-0" dir="rtl">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>عنوان</td>
                                <td>توضیحات</td>
                                <td>کد</td>
                                <td>کیف پول</td>
                                <td>پذیرنده</td>
                                <td>حذف</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product, i in products" :key="i">
                                <td>{{ i + 1 }}</td>
                                <td>{{ product.title }}</td>
                                <td>{{ product.description }}</td>
                                <td>{{ product.code }}</td>
                                <td>{{ product.wallet.title }}</td>
                                <td>{{ product.supplier?.title }}</td>
                                <td ><button v-if="product.id != 1" class="btn btn-sm btn-outline-danger" @click="removeProduct(product.id)">حذف</button></td>
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
            products: [],
            suppliers: [],
            wallets: [],
            title: null,
            desc: null,
            code: null,
            supplier_id: null,
            wallet_id: null,
        }
    },
    mounted() {
        this.getProducts()
        this.getWallets()
        this.getSuppliers()
    },

    methods: {
        getWallets: function () {
            axios.get('http://188.121.120.190:8400/v1/wallet')
                .then(response => response.data)
                .then(result => {
                    this.wallets = result.wallets;
                })
        },

        getSuppliers: function () {
            axios.get('http://188.121.120.190:8400/v1/supplier/index2')
                .then(response => response.data)
                .then(result => {
                    this.suppliers = result.suppliers;
                })
        },

        getProducts: function () {
            axios.get('http://188.121.120.190:8400/v1/product')
                .then(response => response.data)
                .then(result => {
                    this.products = result.products;
                })
        },


        makeProduct: function () {
            const form = new FormData();
            form.append('title', this.title);
            form.append('description', this.desc);
            form.append('code', this.code);
            form.append('supplier_id', this.supplier_id);
            form.append('wallet_id', this.wallet_id);

            axios.post('http://188.121.120.190:8400/v1/product',form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => response.data)
                .then(result => {
                    if(result)
                    this.getProducts();
                })
        },

        removeProduct: function (id) {
            axios.delete(`http://188.121.120.190:8400/v1/product/${id}`)
                .then(response => response.data)
                .then(result => {
                    if(result)
                    this.getProducts();
                })
        }
    }
}
</script>

<style scoped>

</style>