const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const Order = require("../models/Order");
const path = require("path");

const nodemailer = require("nodemailer");
const Email = require("email-templates");

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const email = new Email({
    message: {
        from: "tivialvarez@gmail.com"
    },
    transport: smtpTransport,
    juiceResources: {
        preserveImportant: true,
        webResources: {
          //
          // this is the relative directory to your CSS/image assets
          // and its default path is `build/`:
          //
          // e.g. if you have the following in the `<head`> of your template:
          // `<link rel="stylesheet" style="style.css" data-inline" />`
          // then this assumes that the file `build/style.css` exists
          //
          relativeTo: path.join(__dirname, '..', 'emails')
          //
          // but you might want to change it to something like:
          // relativeTo: path.join(__dirname, '..', 'assets')
          // (so that you can re-use CSS/images that are used in your web-app)
          //
        }
      }
});


exports.checkout = (req, res)=> {
    const formData = req.body.formData;
    stripe.charges.create({
        amount: formData.cart.totalPrice,
        currency: "usd",
        description: "Purchases from Gamer's Gulf",
        source: formData.token.id
    }, function(err, charge){
        if(err) return res.status(500).json({success: false, err});
        Order.create({
            chargeId: charge.id,
            customer: {
                name: formData.name,
                email: formData.email
            },
            cart: formData.cart,
            shipping: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
            }
        }, (err, order)=>{
            if(err) return res.status(500).json({success: false, err});
            email.send({
                template: 'checkoutConfirmation',
                message: {
                to: 'tivialvarez@gmail.com'
                },
                locals: {
                purchases: formData.cart.items,
                total: formData.cart.totalPrice,
                orderId: order._id,
                
                }
            })
            .then(console.log)
            .catch(console.error);

            res.status(200).json({success: true, order});
        });
    })
}


module.exports = exports;