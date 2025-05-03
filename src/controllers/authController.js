const User = require('../model/User'); // User modelini içe aktar


const login = async (req, res) => { 
    const { email, password } = req.body;
    // 1. Alan doğrulamaları
    if (!email || !password) {
        return res.status(400).json({ message: 'Lütfen e-posta ve şifre girin.' });
    }
    try {
      const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
        }
        // Başarılı giriş işlemi
        //oturum a kaydetme işlemi
        req.session.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType
        }; // Kullanıcıyı oturumda sakla
        
        return res.render("home",{results:null,user:req.session.user}); // Kullanıcı bilgilerini döndür
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ message: 'Sunucu hatası.' });
    }
};
const register = async (req, res) => {
    const { name, email, phone, userType, password, confirmPassword, acceptedTerms } = req.body;

  // 1. Alan doğrulamaları
  if (!name || !email || !phone || !userType || !password || !confirmPassword || !acceptedTerms) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Şifreler eşleşmiyor.' });
  }

  try {
    // 2. E-posta zaten kayıtlı mı?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Bu e-posta zaten kullanılıyor.' });
    }

    // 3. Yeni kullanıcıyı oluştur ve kaydet
    const newUser = new User({
      name,
      email,
      phone,
      userType,
      password,
      acceptedTerms: true
    });

    await newUser.save();

    return res.status(201).render("login"); // Kayıt başarılı mesajı ile giriş sayfasına yönlendir
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
const logout = async (req, res) => {
  const { user } = req.session; // Oturumdan kullanıcıyı al
  if (user) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout Error:', err);
        return res.status(500).json({ message: 'Sunucu hatası.' });
      }
      return res.render("logout"); // Ana sayfaya yönlendir
    });
  }
}

module.exports = {
    login,
    register,
    logout
};
