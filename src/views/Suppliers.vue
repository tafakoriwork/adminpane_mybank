<template>
    <Container msg="Welcome to Your Vue.js App">
        <template v-slot:main>
            <div class="card">
                <div class="card-header">
                    افزودن پذیرنده
                </div>
                <div class="card-body">
                    <div class="row mx-0 justify-content-center">
                        <div class="col-sm-8 my-1">
                            <input type="text" class="form-control text-end" placeholder="نام" v-model="title">
                        </div>
                        <div class="col-sm-8 my-1">
                            <input type="text" class="form-control text-end" placeholder="لینک" v-model="url">
                        </div>
                        <div class="col-sm-8 my-1">
                            <select id="type" v-model="type" class="form-select text-end">
                                <option value="shop">فروشگاه</option>
                                <option value="rosta">روستای هوشمند</option>
                            </select>
                        </div>
                        <div class="col-sm-8 my-1">
                            <img :src="preview_img" alt="preview" class="my-1" v-if="preview_img" width="64">
                            <br>
                            <input type="file" ref="logo" class="d-none" @change="logofile" accept="image/*">
                            <button class="btn btn-outline-primary" @click="$refs.logo.click()">
                                لوگو
                            </button>
                        </div>
                        <div class="col-sm-8 my-1">
                            <button class="btn btn-primary" @click="makeSupplier">
                                ایجاد
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">پذیرندگان</div>
                <div class="card-body">
                    <table class="table m-0" dir="rtl">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>عنوان</td>
                                <td>نوع</td>
                                <td>Merchant_id</td>
                                <td>لینک</td>
                                <td>حذف</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="supplier, i in suppliers" :key="i">
                                <td>{{ i + 1 }}</td>
                                <td>{{ supplier.title }}</td>
                                <td>{{ supplier.type == 'shop' ? 'فروشگاه' : 'روستای هوشند' }}</td>
                                <td>{{ supplier.merchant_id }}</td>
                                <td>{{ supplier.url }}</td>
                                <td><img :src="`http://188.121.120.190:8400/${supplier.logo}`" width="70" alt="logo"></td>
                                <td><button class="btn btn-sm btn-outline-danger" @click="removeSupplier(supplier.id)">حذف</button></td>
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
            suppliers: [],
            preview_img: null,
            img: null,
            title: null,
            type: 'shop',
            url: null,
        }
    },
    mounted() {
        this.getSuppliers()
    },

    methods: {
        getSuppliers: function () {
            axios.get('http://188.121.120.190:8400/v1/supplier/index2')
                .then(response => response.data)
                .then(result => {
                    this.suppliers = result.suppliers;
                })
        },

        logofile: function (e) {
            const logo = e.target.files[0];
            this.preview_img = URL.createObjectURL(logo);
            this.img = logo;
        },

        makeSupplier: function () {
            const form = new FormData();
            form.append('title', this.title);
            form.append('url', this.url);
            form.append('type', this.type);
            form.append('logo', this.img);
            axios.post('http://188.121.120.190:8400/v1/supplier',form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => response.data)
                .then(result => {
                    if(result)
                    this.getSuppliers();
                })
        },

        removeSupplier: function (id) {
            axios.delete(`http://188.121.120.190:8400/v1/supplier/${id}`)
                .then(response => response.data)
                .then(result => {
                    if(result)
                    this.getSuppliers();
                })
        }
    }
}
</script>

<style scoped>

</style>