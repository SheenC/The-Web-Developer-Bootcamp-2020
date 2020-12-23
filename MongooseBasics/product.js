const mongoose = require('mongoose');
const { threadId } = require('worker_threads');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open!");
    })
    .catch(err => {
        console.log("Error!");
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        // min: 0
        min: [0, 'Price must be positive!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    // categories: [String]
    categories: {
        type: [String]
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

// productSchema.methods.greet = function() {
//     console.log("Hello!");
//     console.log(`- from ${this.name}`);
// }

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {
    //return can be awaited
    //static this refers to the entire model
    return this.updateMany({}, { onSale: true, price: 0 });
}


const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Bike Helmet' });
    // foundProduct.greet();
    // foundProduct.onsale = !foundProduct.onsale;
    // foundProduct.save();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);
}

// findProduct();

Product.fireSale()
    .then(res => {
        console.log(res);
    })

// const bike = new Product({
//     name: 'Montain Bike',
//     price: 599,
//     qty: {
//         online: 10,
//         inStore: 5
//     }
// });
// bike.save()
//     .then(data => {
//         console.log('It worked!');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Oh no error!');
//         console.log(err);
//     });

// const bikeHelmet = new Product({
//     name: 'Bike Helmet',
//     price: 19.50,
//     categories: ['Cycling', 'Safety']
// });
// bikeHelmet.save()
//     .then(data => {
//         console.log('It worked!');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Oh no error!');
//         console.log(err);
//     });


/*
mongo
show dbs
use shopApp
db.products.find()
*/

// const tirePump = new Product({
//     name: 'Tire Pump',
//     price: 50,
//     categories: ['Cycling']
// });
// tirePump.save()
//     .then(data => {
//         console.log('It worked!');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Oh no error!');
//         console.log(err);
//     });


//show the new data, and should run the validation
// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 100 }, {new: true, runValidators: true})
//     .then(data => {
//         console.log('It worked!');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Oh no error!');
//         console.log(err);
//     });


