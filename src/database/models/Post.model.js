const mongoose = require("mongoose");

const schema = mongoose.Schema;

const post = schema({
  subject: String,
  comment: String,
  author: { type: schema.Types.ObjectId, ref: "Users", required: true },
  picture: {
    type: String,
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAADLCAMAAAB04a46AAAAe1BMVEX29vYEBAQAAAD8/Pz///+Pj4/4+PiHh4cxMTGgoKD09PQHBwfDw8Pb29vk5OTp6el6enqzs7PQ0NC7u7taWlqsrKxqamrZ2dmAgICXl5dLS0snJycXFxfm5uampqbT09NAQEA5OTlTU1NgYGBycnIgICAtLS1GRkYZGRn+jJQjAAALA0lEQVR4nO2dCXvqLBOG0wHHCtFoXOrSurfn/f+/8IOogURbISGBfs1zlutcPW3C7bAMAwxR9BdEBr2yfBepHeEOyvJdpJZEJwAvBfkuUVuiPeB/EhzJGP4keIR0XKjtvsvTomgfXjj/g+BItsLm/O+BC5vvNvAHLS5EmGjol+ruuygtC0m6v/RxvkvSthDJVKDDnwNnwugYL/6My1oUIcnUdxn8CCPiuwidOv3/CIUuf1vq+uN+S19HgoFUF/5SdCSUvE3ng4qaxCPxgN+Ejsgy6uFqfRfvstRpPqL4i9iRkWiSuYf1lLHH5NeMvKJhzz8v2Pwp3HP4fUx/hdERaXqobewC+mwUvtFFT0x6LrEzcpj8gqbOjlC/gt+hLwPv35EkG7fmvqGfRBsKeVxviFuSkyjg6o5f7uv5jXxBIuab7xshWTTG/cJhQH0DficyaaieZwJ4C7SqY+J4HCuT78M0OdJlcxX9Qj4NcVBD1rDBBfghyKkqWTXMzV8gDg9bmPzQMLjo2M80PItj2jS3qOs88Y15LzpuHvwFJsHN05DxNsDXgY1oKJ2XZseyK/lHWG0cI3psweACfBVYXRdeWxvcHF7Dsnjzg/hNkAZFjs0P4jfwsefQY/HtpIVB/AoOrPjq1qMTao0ramkQv5JPCqitmz9bFbst8pGo6fmJBn6kD5cYW4EmhI3SWNMKeBujuBSHuKBhgqQdeKTJYPZeWuVqiTpTeYVtv0xbWF1E+rZom/RnydJ8zpsmR1yGBH0VBzikcphrhp6JYWvkdFnMoQBWjZGLmcguUGwpODe01oIMh+BoCtZEz8jh1FB8Blnt9SF+Y97MzsvVdj7ojRf/+OVLDtbSl424s0gXNbm5pH5f9yZDFmmbfKIk3Z4PLkzfTICmrj+eDbmrlFGSORwYXZwuzBwiSkbTcW12gMS5yUU595VLxTNbr7cJ/d7JQkJpuvyshw4L55Wd1TG4bMX94fNdPEjZ9FintQOMHHNnh5iqF+d9wMw2cwi77xZVa7zsOpfOWzmpEkUVdVzU8s9BZOFRIh0uJHmlaQ98ul5Dx7dKZuCilvcTq4aHt31TlWo8pI5NTqbVqh/8e6O2DpX4fjqoWN1dh2GRDKwLkvXlvYdd2qW9C0B2Qy2j0+FazPHtjS6X15xKHlO0LwVPHxUjC9qI0euix1EU8Q39Kv07rF1X9QrgsGYPOjXRcUejeCuc1dnstFj25uk325TptEJ1h4Nbi6M1uOjWzsUqLCdPwpDDwWlTiqG8nicJIVc/Tvuwd+/WIS14dVzVbcEFd69cBNFdD3uv9xOy7CvSrysFjsX0/8vW5t7BRfdKywbEWO5gl8PUnRkzn3aRFntCUUOSV9vX+gUXHD1lv8uUhE6fbGEX/zuTnWG+YiD+IbeIWtV2v+Cini/194vWbbaXW1j9o9jPkY93q77ds8XhpBcfr6eYDXwx4egNCOpuJxla9e0+wYW9v4oLXDTdGJce4JhoLR0zn9Hc5l7BX2CkcTPp9VkZDQqHMVAmNDEm91rVYVLwznFsN+EQ1X1bICf/LN7tERwWeQMXrRWjmbUDBnJMUK0FR+ZP8AgOXGvgiGxdwePm0Nd7R7r9FeB6qBPJusJCqpzXrTQAxLXx232Bczjqb64ektb35aMY0wIHF6Z603dK9GoE6mKifDh6Nmww3iwOZ6KOQYshuHLEVPTtajMf4odh/+YPfJSvWZqX9iE4h70aHdA0EOILHBbae8mp5sKIFj8z/RA9gYPewsm87kIgDFVlL6dlCww879KF/8Feap+jnqmFX7Iz+hh9gasxHO9yBlYh185iUKO1Oz/gAMpHl4ex6oMf6C0AjWYbw72Acxgrg1cJyz7giG9PxMjolJMni6uaiezdCfhMdex0Fio4QKFLd8Bd6NiNTnD6Ac/noxhRR/u4oZ+DGB0G8AN+21+IEQ4rrnaWxGGT1yIkBh+mH/ChKqP9GuN3D1VHEugyTHDYsOtoxiJi0hEZiOt+q0kj9wKu3DaHJ6phncffTDYneAHPU3egw/OWACoIxQIFn+fOhrsmLh67U0PF8zVEL+Cxao0Oz6ho/r/BqT4v4DvV/1pEwp8+tmfzeXoBT9Ro9ukQXMU2DI71eQFnah3B4dFiLWxr0HV4Bq8TbLt77D9V1QMFzyfjaLe0++SxexWFCRKca+DVtkF+g3JgYYPrnZtTix+UxQPt3BS4xfLmU8FetfHnCzNewNXkzGUuHDgSm0L4AM8nkBg5iTtdH3vKUeg5THAVGDRwqo0FYwUeqMs6yedRRnFBQ8FWfZ6HpxFmL+CDHNygFzKWVpHIf2GCjxW4w5R22mBh0Gd6AZ+pd47cBSK4CrMauAdewJWngcxZlhC50+BWhjjQmJt2zs9dtgwVh0CTZDN+wst5JAIxdhNXl59mXgaDYdzzgoIceRz5btoSecALClpWHldRN805QIMgqyfwTw185wQc3tWKu0nf5mu1VEuETo03I/74SO1gi9GmOU/r43lkPWJG9nn6QP1AODHZC+IJXNu3LDdb100HxLVFYjnJN/gRj3tg8j44rg0uDW651cAPOIep2gTD6Kn2PretthHarNPwtd1L29hYb0dn9rS9durUMJzlbWejnkWz5j4Y0Pa/mPmr/sBLx7frJVDR5vey/pglofEGzvX3ypQ5VZs514aIyPzgvr9t23Pd5Jan5QoPOqB28A6NBnGv4F+Fk7QkrZry4DPRwY0zNfg7jAPbQmWXF59XOYUEIw2byb0QgR/NKEygpaqd+38XXr/Ws9GB6afn7xSSHgfPzhELD86WHL4+iH6w1mIntMdzZ1zbC5NtciRDi/0RWeKzIysk40NqfsbDK/gnK6UKYCdTo2fcvVIqLBtHyOtpYpiVUh5cbj43KzjwuHQ3BrHZF+v1NDHX8yRcREfHp0mMeMbdl5foFpIMW10s5TtjwKScGUPMUg8/Jw3IavnsrZgpQabKsQrl+M4KAtPS+0XvTqaHn7JjXHJjlJMA2V4s5R0c4lIyH9m90/S7LL4ym25/eJ8OS3LbvNc7uCCZPEp3RJPJopiU9Jqicxk/SI8kKrrterN3cJkal5Ttl/kzlKTb8/q/PN/RZracDCl5lO2JjPa2/q5/cOFun9jDTFtZanbGPt7SdDdMWJSluHqQ8w1pbL+jxD+4LMRm923uvueJ4Umle0Bdg1c6PyeMvnyU2MzohTa5YxoEr5bITsxY3udYckieIss/JDlXO6EZRFV/uWQ+n/6QhvYhOKFJr2qK0lDAM/SvOTPP0ykv8F5C1SSdzjP41bn6RqC/L3eUXqv8D4lTEcU3TY51UjC7vh8L6+1jksN1P42yOi9/leHxknuafkzqXtBQCIM4Ia97oEpmGJ8N0gSzbNulCQwhlH1M+4f6edZh4DhLp9F2hOfsAP8Wq2maEFHzs99C0TCe92dfbpLru78kytGFZrmn+rU+nc+L2V75rk4ev3Gce1mMMeaJpp6JX3JT3uTyTp0GLsdq+gJeN2ri/uIWb7iqKC43h7kHx1Er1zXWEuzs3GMzcOmuh4zOLy3cvckj1tx98g6UJQd1Dy1VeemzHQEMG7kDSzyTNnqlfE3dxzcdSmb4D7K2y7sapo6d1SL5PMjaLrnTRu/1ZBUjQg0L4PjR9N29hPVDutnvsuDGG7/aL8oWBa5p8UPRcYKkoYGsSI4kGk5WvTA0iBNyv3LRIHs4agu6U6dOnTp16tSpU6dOnTp16tSpU6dOnTp16tSpU6dOnTp16tQpWP0PuvmxRxUSIHsAAAAASUVORK5CYII=",
  },

  content: {
    type: Array,
    default: [],
  },

  authorComment: {
    type: schema.Types.ObjectId,
    ref: "Users",
  },
  idComment: {
    type: Number,
    default: 0,
  },
  Like: { type: [schema.Types.ObjectId], ref: "Users" },
});

const Post = mongoose.model("Posts", post);

module.exports = Post;
