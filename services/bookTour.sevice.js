const Booktour = require("../models/booktour");
const Tour = require("../models/tour");
const Customer = require("../models/customer");

const { mailerUtil } = require("../utils");
const { EMAIL_TYPE, Mailer } = mailerUtil;
const gigZooAdminEmail = "travel@gmail.com";
const { SEND_EMAIL_APPLY_TOUR } = EMAIL_TYPE;

const sendMailApplyTour = async (
  tour_id,
  emailcompany,
  nameCompany,
  nameTour,
  nameCustomer,
  emailCustomer,
  address,
  phone,
  required
) => {
  console.log(
    tour_id,
    emailcompany,
    nameCompany,
    nameTour,
    nameCustomer,
    emailCustomer,
    address,
    phone,
    required,
    "o90000000"
  );
  try {
    Mailer(`"Travel" <${gigZooAdminEmail}>`, emailcompany).sendMail(
      SEND_EMAIL_APPLY_TOUR,
      {
        tour_id: tour_id,
        emailcompany: emailcompany,
        nameCompany: nameCompany,
        nameTour: nameTour,
        nameCustomer: nameCustomer,
        emailCustomer: emailCustomer,
        address: address,
        phone: phone,
        required: required,
      }
    );
  } catch (err) {
    console.log("adminSendMailRefer", err);
    reject(err);
  }
};

const addApplication = (customer_id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await Customer.findById(customer_id);
      let tour = await Tour.findById(body.tour_id);
      if (!customer) {
        return reject({ message: "Only customer can book to tour" });
      } else {
        let i = customer.applied_tours.indexOf(body.tour_id);
        if (i === -1) {
          let data = {
            customer_id: customer_id,
            tour_id: body.tour_id,
            nameTour: body.nameTour,
            nameCustomer: body.nameCustomer,
            emailCustomer: body.emailCustomer,
            address: body.address,
            phone: body.phone,
            required: body.required,
          };
          // let booktour = new Booktour(data);
          // await booktour.save();
          customer.applied_tours.push(body.tour_id);
          await customer.save();
          tour.isApplied.push(customer_id);
          await tour.save();
          await Tour.findByIdAndUpdate(body.tour_id, { isApplied: tour.isApplied.push(customer_id) })
          try {
            Mailer(`"Travel" <${gigZooAdminEmail}>`, emailcompany).sendMail(
              SEND_EMAIL_APPLY_TOUR,data
            );
          } catch (err) {
            console.log("adminSendMailRefer", err);
            reject(err);
          }
          return resolve(customer.applied_tours);
        } else {
          return reject({ message: "You have already applied to this tour" });
        }
      }
    } catch (err) {
      return reject(err);
    }
  });
};

const getApplicationDetails = (id) => {
  return new Promise((resolve, reject) => {
    Booktour.findById(id)
      .populate({
        path: "company_id",
        populate: {
          path: "user_id",
          model: "User",
          select: { password: 0 },
        },
      })
      .populate({
        path: "customer_id",
        populate: {
          path: "user_id",
          model: "User",
          select: { password: 0 },
        },
      })
      .populate({
        path: "tour_id",
        model: "Tour",
      })
      .then((doc) => {
        if (doc == null) throw new Error("Application not found !");
        resolve(doc);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAllApplications = () => {
  return new Promise((resolve, reject) => {
    Booktour.find()
      .populate({
        path: "tour_id",
        model: "Tour",
      })
      .then((doc) => {
        if (doc == null) throw new Error("Applications not found !");
        resolve(doc);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  addApplication,
  getAllApplications,
  getApplicationDetails,
  sendMailApplyTour,
};
