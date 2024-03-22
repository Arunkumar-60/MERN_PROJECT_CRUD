const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getAdminByEmail, getAdminById) {
  const authenticateUser = async (email, password, done) => {
    const admin = getAdminByEmail(email);
    if (admin == null) {
      return done(null, false, { message: "No admin with that email" });
    }
    try {
      if (await bcrypt.compare(password, admin.password)) {
        return done(null, admin);
      } else {
        return done(null, false, { message: "password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((admin, done) => done(null, admin.id));
  passport.deserializeUser((id, done) => {
    return done(null, getAdminById(id));
  });
}

module.exports = initialize;
