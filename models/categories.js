const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
  },
  {
    timestamps: true
  }
);

const dataMigrate = [
    {
      name: "Du lịch tham quan",
      description: "Tham quan di tích lịch sử, thắng cảnh"
    }, 
    {
      name: "Du lịch văn hóa",
      description: "  Du lịch này du khách có thể vừa tham quan vừa kết hợp du lịch văn hóa"
    }, 
    {
      name: "Du lịch ẩm thực",
      description: "Những bữa tiệc cung đình Huế hay ẩm thực Bắc Trung Nam… Nét tinh tế của ẩm thực Việt Nam chịu sự ảnh hưởng rất lớn của yếu tố lịch sử, khí hậu, điều kiện tự nhiên…"
    }, 
    {
      name: "Du lịch xanh",
      description: "Du lịch hướng về thiên nhiên,Du lịch sinh thái,Du lịch nghỉ dưỡng và chữa bệnh"
    },
    {
      name: "Du lịch MICE",
      description: "Loại hình du lịch này theo dạng gặp gỡ xúc tiến, hội nghị, hội thỏa, du lịch chuyên đề ở Vũng Tàu, Đà Nẵng…  Mice là dạng du lịch tập thể dành cho các doanh nghiệp, công ty. Ngoài ra, còn có các loại hình du lịch như : du lịch tuần trăng mật ở Đà Lạt, Sa Pa, Tam Đảo…,"
    },
    {
      name:"Teambuilding",
      description:"Teambuiding tour kết hợp du lịch tham quan, nghĩ dưỡng với các chương trình Team nhằm xây dựng, tăng cường tinh thần đoàn kết, tập thể, loại hình du lịch này đang được nhiều doanh nghiệp, công ty “đặt hàng” nhằm nâng cao vai trò đoàn kết giữa các nhân viên với nhau.  "
    }
    
];

CategorySchema.statics.getMigrateData = function() {
  return dataMigrate;
};

module.exports = mongoose.model("Categories",CategorySchema);
