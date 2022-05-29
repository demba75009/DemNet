const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const user = schema({
  pseudo: String,

  local: {
    email: String,
    password: String,
  },
  avatar: {
    type: String,
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAYFBMVEX///8AAAAyMjLu7u7y8vJLS0ulpaUSEhLe3t7Q0ND8/PxXV1dqamoVFRXGxsbJycmYmJh7e3vn5+ddXV0nJyc6OjqJiYlQUFCzs7O6urplZWXAwMAhISGtra2SkpJCQkKAjIbMAAAC4UlEQVRoge2bXZeiMAxAaSlQCoqg8qGM/v9/uTIezw5uC22S4pmzvU/zdic0lCaNURQIBAyIvL+VCec8KW99JbYTy/S+Yz/Z3VO5hVj0HdPR9b6jVynXmid4qnyq92bzt33vzazKRfNE6Sn0atU8UflQp1ZqxlJ69cFSzdjhc2pyue0D9/DYByc1YwOdunFUM9aQue/O7juV2m2xnxAtuQCoGaP5stQgd02hdk+0JxTpBgubJPA4A7qzGO3ugWrGerT7CHYfsepmBLtHbLbZHRj0YI8RLcLdIt0Jwp0g3WeE+4xTxyeE+4R7wyV0Z5nIcIVSjlAzlgf3L3PL3brByA6Xa598xz65t0QFwl0g3S512DvYugyT6Lg0fyTbcpdjCY4+sF3A7gtWHe3BbnzjR0AfOieoim5A9w2vBpaCRMUgLHCKsB+A3DTq6ApQX4nc0Xov852SSh0J16/ZmbCf7bqrY3fyGW5LTrbY7nJitUtB6qGLndsd3UbStX7R2JyfCrpu5pz1AxR57/wvK6F7C/pJbrYXXlZ6hmx1STe2m9wMRiJvi5/tp7Fo8w2vRFUjr2lb13WbXmXj9T4wEAj8XygRT4jtNhYhq+FQd6cse3U7H3+duvowVNLjvirkUCfc3GDN+L0ePPwDqukvdrei58sX6f4ub/qZFhMd1QdVpJAeG0/xD3+PuKNCNT1UD+8yfQffQ1deDZiG5pMzzF655ZeJxL1Mid1rbhOlY48PfgOrw+VWNsZ0j3UU1qFf4fevJkbLuhjTtjZjValBZwzWqFffNgXvG69xXJErmpdaT7coV5gr53WSJbm/B/5koZ2PueS3wzgK4DqlBsEw2QYdHnJD3xbxm2cvtEMQkCk1CJrJNsQQjRuakRv/Of7in1zfLGxN4Fut9sT7imPu2F05zdW4uQZX5g3Ir03dXzO3rwODnvko4zZ72ov53oarfVzhwR3cH3FPP4naDuwQZSDwi/gDoFEtOHgjfAcAAAAASUVORK5CYII=",
  },
  following: { type: [schema.Types.ObjectId], ref: "users" },
  like: { type: [schema.Types.ObjectId], ref: "posts" },
});

user.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

user.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};

const User = mongoose.model("Users", user);

module.exports = User;
