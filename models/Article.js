module.exports = (Schema, model) => model(`Article`, new Schema({
  headline: String,
  summary: String,
  url: String,
  comments: String
}))