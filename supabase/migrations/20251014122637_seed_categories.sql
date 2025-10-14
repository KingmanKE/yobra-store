/*
  # Seed Categories Data

  1. Purpose
    - Populate the categories table with initial mock data
    - Provide diverse product categories for testing

  2. Categories Added
    - Electronics
    - Clothing
    - Home & Kitchen
    - Sports & Outdoors
    - Books
    - Toys & Games
    - Beauty & Personal Care
    - Automotive

  3. Notes
    - Uses ON CONFLICT to prevent duplicate entries
    - Each category includes name, description, and placeholder image
*/

INSERT INTO public.categories (name, description, image, product_count)
VALUES 
  ('Electronics', 'Smartphones, laptops, tablets, and electronic accessories', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg', 0),
  ('Clothing', 'Fashion apparel for men, women, and children', 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg', 0),
  ('Home & Kitchen', 'Furniture, appliances, and home decor items', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg', 0),
  ('Sports & Outdoors', 'Fitness equipment, camping gear, and outdoor activities', 'https://images.pexels.com/photos/221210/pexels-photo-221210.jpeg', 0),
  ('Books', 'Fiction, non-fiction, educational, and entertainment books', 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg', 0),
  ('Toys & Games', 'Educational toys, board games, and entertainment for kids', 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg', 0),
  ('Beauty & Personal Care', 'Skincare, makeup, haircare, and personal hygiene products', 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg', 0),
  ('Automotive', 'Car accessories, tools, and automotive care products', 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg', 0)
ON CONFLICT (name) DO NOTHING;