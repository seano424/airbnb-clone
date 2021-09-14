const data = [
  {
    img: 'https://links.papareact.com/2io',
    title: 'Outdoor getaways',
  },
  {
    img: 'https://links.papareact.com/q7j',
    title: 'Unique stays',
  },
  {
    img: 'https://links.papareact.com/s03',
    title: 'Entire homes',
  },
  {
    img: 'https://links.papareact.com/8ix',
    title: 'Pet allowed',
  },
]

export default function cardsData(req, res) {
  res.status(200).json(data)
}
