const meals = [
  {
    name: 'Guacamole salad',
    ingredients: 'avocado, tomato, onion, lemon, salt, pepper',
    image:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.delish.com%2Fuk%2Fcooking%2Frecipes%2Fa29842914%2Favocado-tomato-salad-recipe%2F&psig=AOvVaw17yV_DiWon3lmVrFE1X0sM&ust=1678298822744000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJjXhru0yv0CFQAAAAAdAAAAABAJ',
    category: 'starter',
    value: 'guac-salad'
  },
  {
    name: 'Chicken salad',
    ingredients: 'chicken, tomato, onion, lemon, salt, pepper',
    image: 'https://dinnerthendessert.com/wp-content/uploads/2019/01/Classic-Chicken-Salad-2.jpg',
    category: 'starter',
    value: 'chicken-salad'
  },
  {
    name: 'Smoked salmon and tzatziki crisp breads',
    ingredients: 'smoked salmon, olive oil, lemon juice, salt, onion, cucumber, tzatziki, bread',
    image:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fseabear.com%2Fproducts%2Fsignature-european-smoked-salmon-lox&psig=AOvVaw1IWIxcoIcxn7vrYHpF9Fz0&ust=1678299168459000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIjp69-1yv0CFQAAAAAdAAAAABAS',
    category: 'starter',
    value: 'smoked-salmon'
  },
  {
    name: 'Prawn cocktail',
    ingredients: 'prawn, tomato, onion, lemon, salt, pepper',
    image: 'https://www.deliciousmagazine.co.uk/wp-content/uploads/2019/09/prawn-cocktail.jpg',
    category: 'starter',
    value: 'prawn-cocktail'
  },
  {
    name: 'Filet mignon & green beans',
    ingredients: 'filet mignon, green beans, olive oil, salt, pepper',
    image: 'https://realfood.tesco.com/media/images/griddled-steak-caper-butter-l-4d8ec706-90c6-4be9-b84e-1f54c0afa970-0-1400x919.jpg',
    category: 'main',
    value: 'filet-mignon'
  },
  {
    name: 'Chicken breast & broccoli',
    ingredients: 'chicken breast, broccoli, olive oil, salt, pepper',
    image: 'https://static.onecms.io/wp-content/uploads/sites/44/2020/03/06/7804694.jpg',
    category: 'main',
  },
  {
    name: 'Beef Tenderloin & asparagus',
    ingredients: 'beef tenderloin, asparagus, olive oil, salt, onion, white wine',
    image: 'https://natashaskitchen.com/wp-content/uploads/2020/12/Beef-Tenderloin-with-Mushroom-Sauce-SQ-1.jpg',
    category: 'main',
    value: 'beef-tenderloin'
  },
  {
    name: 'Sweet Potato mash',
    ingredients: 'sweet potato, butter, milk, salt, pepper',
    image:
      'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2019-11-how-to-mashed-sweet-potatoes%2F2019-10-21_Kitchn88397_HT-Best-Mashed-Sweet-Potatoes',
    category: 'side',
    value: 'sweet-potato-mash'
  },
  {
    name: 'Roasted potatoes',
    ingredients: 'potato, olive oil, salt',
    image: 'https://static.onecms.io/wp-content/uploads/sites/43/2022/06/29/18324-roast-potatoes-ddmfs-3x4-0184.jpg',
    category: 'side',
    value: 'roasted-potatoes'
  },
  {
    name: 'Rice',
    ingredients: 'rice, olive oil, salt',
    image:
      'https://www.thespruceeats.com/thmb/kUoSjpktuKuTQpxkm-OFgOxl8s4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-make-basic-white-rice-2355883-10-5b0da96eba6177003622896e.jpg',
    category: 'side',
    value: 'rice'
  },
  {
    name: 'Chocolate cake',
    ingredients: 'chocolate, flour, sugar, butter, eggs, milk, baking powder, salt',
    image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0A475B34-4E78-40D8-9F30-46223B7D77E7/Derivates/E55C7EA4-0E60-403F-B5DC-75EA358197BD.jpg',
    category: 'dessert',
    value: 'chocolate-cake',
  },
  {
    name: 'Cheesecake',
    ingredients: 'cream cheese, sugar, eggs, flour, butter, lemon juice, salt',
    category: 'dessert',
    value: 'cheesecake',
    image: ''
  }
];

module.exports = { meals };
