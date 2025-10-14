/*
  # Seed Products Data

  1. Purpose
    - Populate the products table with diverse mock data
    - Provide test data for all categories
    - Include various price ranges and product types

  2. Products Added
    - 30+ products across all categories
    - Mix of regular and deal items
    - Different brands and ratings

  3. Notes
    - Uses category names to reference categories
    - Includes realistic product details
    - Some items marked as today's deals
*/

WITH category_lookup AS (
  SELECT id, name FROM public.categories
)
INSERT INTO public.products (
  name, description, price, original_price, discount, image, category_id, brand, 
  rating, reviews, in_stock, stock_quantity, features, tags, is_todays_deals
)
SELECT * FROM (VALUES
  -- Electronics
  ('iPhone 15 Pro', 'Latest Apple smartphone with A17 Pro chip, titanium design, and advanced camera system', 999.99, 1099.99, 9, 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', (SELECT id FROM category_lookup WHERE name = 'Electronics'), 'Apple', 4.8, 2156, true, 50, ARRAY['A17 Pro chip', '6.1-inch display', 'Triple camera system', '5G enabled'], ARRAY['smartphone', 'flagship', 'premium'], true),
  ('Samsung Galaxy S24', 'Powerful Android smartphone with AI features and stunning display', 799.99, 899.99, 11, 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg', (SELECT id FROM category_lookup WHERE name = 'Electronics'), 'Samsung', 4.7, 1834, true, 75, ARRAY['Snapdragon 8 Gen 3', 'AI features', 'Dynamic AMOLED display'], ARRAY['smartphone', 'android', 'flagship'], true),
  ('MacBook Pro 14"', 'Professional laptop with M3 Pro chip for creators and developers', 1999.99, 2299.99, 13, 'https://images.pexels.com/photos/18105/pexels-photo.jpg', (SELECT id FROM category_lookup WHERE name = 'Electronics'), 'Apple', 4.9, 987, true, 30, ARRAY['M3 Pro chip', '14-inch Liquid Retina XDR', '18-hour battery'], ARRAY['laptop', 'professional', 'creative'], false),
  ('Dell XPS 13', 'Ultra-portable Windows laptop with stunning InfinityEdge display', 1299.99, NULL, 0, 'https://images.pexels.com/photos/7974/pexels-photo.jpg', (SELECT id FROM category_lookup WHERE name = 'Electronics'), 'Dell', 4.6, 1523, true, 45, ARRAY['Intel Core i7', '13.4-inch display', 'Premium build'], ARRAY['laptop', 'ultrabook', 'portable'], false),
  ('Sony WH-1000XM5', 'Industry-leading noise canceling wireless headphones', 349.99, 399.99, 13, 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg', (SELECT id FROM category_lookup WHERE name = 'Electronics'), 'Sony', 4.8, 3421, true, 120, ARRAY['Active noise canceling', '30-hour battery', 'Premium sound'], ARRAY['headphones', 'wireless', 'audio'], true),
  
  -- Clothing
  ('Classic Denim Jacket', 'Timeless denim jacket perfect for any casual outfit', 79.99, NULL, 0, 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg', (SELECT id FROM category_lookup WHERE name = 'Clothing'), 'Levi''s', 4.5, 892, true, 150, ARRAY['100% cotton', 'Classic fit', 'Multiple pockets'], ARRAY['jacket', 'casual', 'denim'], false),
  ('Running Shoes Pro', 'High-performance running shoes with superior cushioning', 129.99, 159.99, 19, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', (SELECT id FROM category_lookup WHERE name = 'Clothing'), 'Nike', 4.7, 2341, true, 200, ARRAY['Responsive cushioning', 'Breathable mesh', 'Durable outsole'], ARRAY['shoes', 'athletic', 'running'], true),
  ('Cotton T-Shirt Pack', 'Pack of 3 premium cotton t-shirts in various colors', 29.99, 44.99, 33, 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', (SELECT id FROM category_lookup WHERE name = 'Clothing'), 'Hanes', 4.3, 1567, true, 500, ARRAY['100% cotton', 'Pre-shrunk', 'Tag-free'], ARRAY['t-shirt', 'basics', 'casual'], true),
  ('Yoga Pants', 'Comfortable and flexible yoga pants for active lifestyle', 49.99, NULL, 0, 'https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg', (SELECT id FROM category_lookup WHERE name = 'Clothing'), 'Lululemon', 4.6, 1098, true, 180, ARRAY['Moisture-wicking', '4-way stretch', 'High waist'], ARRAY['athletic', 'yoga', 'comfortable'], false),
  
  -- Home & Kitchen
  ('Espresso Machine', 'Professional-grade espresso maker for home baristas', 399.99, 499.99, 20, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg', (SELECT id FROM category_lookup WHERE name = 'Home & Kitchen'), 'Breville', 4.7, 1876, true, 40, ARRAY['15-bar pressure', 'Built-in grinder', 'Milk frother'], ARRAY['coffee', 'appliance', 'kitchen'], true),
  ('Chef Knife Set', 'Professional 8-piece knife set with wooden block', 149.99, NULL, 0, 'https://images.pexels.com/photos/2927425/pexels-photo-2927425.jpeg', (SELECT id FROM category_lookup WHERE name = 'Home & Kitchen'), 'Wüsthof', 4.8, 967, true, 65, ARRAY['High-carbon steel', 'Full tang', 'Lifetime warranty'], ARRAY['knives', 'cooking', 'professional'], false),
  ('Air Fryer XL', 'Large capacity air fryer for healthier cooking', 119.99, 149.99, 20, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg', (SELECT id FROM category_lookup WHERE name = 'Home & Kitchen'), 'Philips', 4.6, 3421, true, 85, ARRAY['7.5L capacity', '8 preset modes', 'Easy clean'], ARRAY['appliance', 'cooking', 'healthy'], true),
  ('Bamboo Cutting Board', 'Extra-large bamboo cutting board with juice groove', 34.99, NULL, 0, 'https://images.pexels.com/photos/6086617/pexels-photo-6086617.jpeg', (SELECT id FROM category_lookup WHERE name = 'Home & Kitchen'), 'Totally Bamboo', 4.5, 2134, true, 200, ARRAY['Eco-friendly', 'Knife-friendly', 'Easy maintenance'], ARRAY['cutting board', 'bamboo', 'sustainable'], false),
  
  -- Sports & Outdoors
  ('Yoga Mat Premium', 'Extra-thick yoga mat with superior grip and cushioning', 39.99, 59.99, 33, 'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg', (SELECT id FROM category_lookup WHERE name = 'Sports & Outdoors'), 'Manduka', 4.7, 1543, true, 250, ARRAY['6mm thick', 'Non-slip surface', 'Eco-friendly'], ARRAY['yoga', 'fitness', 'exercise'], true),
  ('Camping Tent 4-Person', 'Spacious and weather-resistant camping tent', 179.99, NULL, 0, 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', (SELECT id FROM category_lookup WHERE name = 'Sports & Outdoors'), 'Coleman', 4.5, 876, true, 45, ARRAY['Weather-resistant', 'Easy setup', 'Spacious interior'], ARRAY['camping', 'outdoor', 'tent'], false),
  ('Mountain Bike 27.5"', 'Durable mountain bike for trail adventures', 599.99, 799.99, 25, 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg', (SELECT id FROM category_lookup WHERE name = 'Sports & Outdoors'), 'Trek', 4.8, 654, true, 20, ARRAY['Aluminum frame', '21-speed', 'Front suspension'], ARRAY['bike', 'mountain', 'cycling'], true),
  ('Resistance Bands Set', 'Complete set of resistance bands for home workouts', 24.99, 34.99, 29, 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg', (SELECT id FROM category_lookup WHERE name = 'Sports & Outdoors'), 'TRX', 4.4, 2987, true, 400, ARRAY['5 resistance levels', 'Portable', 'Door anchor included'], ARRAY['fitness', 'home gym', 'resistance'], true),
  
  -- Books
  ('The Science of Success', 'Bestselling self-help book on achieving your goals', 19.99, NULL, 0, 'https://images.pexels.com/photos/1261180/pexels-photo-1261180.jpeg', (SELECT id FROM category_lookup WHERE name = 'Books'), 'Random House', 4.6, 5432, true, 300, ARRAY['Hardcover', '350 pages', 'New York Times Bestseller'], ARRAY['self-help', 'motivational', 'business'], false),
  ('Cooking Mastery', 'Complete guide to culinary techniques and recipes', 34.99, NULL, 0, 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg', (SELECT id FROM category_lookup WHERE name = 'Books'), 'Penguin', 4.8, 1234, true, 150, ARRAY['Full color', '500+ recipes', 'Step-by-step guides'], ARRAY['cookbook', 'cooking', 'recipes'], false),
  ('Mystery Novel Collection', 'Set of 3 bestselling mystery novels', 29.99, 44.99, 33, 'https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg', (SELECT id FROM category_lookup WHERE name = 'Books'), 'HarperCollins', 4.5, 3421, true, 200, ARRAY['Paperback', 'Award-winning authors', 'Complete trilogy'], ARRAY['fiction', 'mystery', 'thriller'], true),
  
  -- Toys & Games
  ('LEGO Creator Expert', 'Advanced building set with 2500+ pieces', 179.99, 199.99, 10, 'https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg', (SELECT id FROM category_lookup WHERE name = 'Toys & Games'), 'LEGO', 4.9, 987, true, 80, ARRAY['2500+ pieces', 'Ages 16+', 'Display model'], ARRAY['building', 'creative', 'collectible'], true),
  ('Board Game Family Pack', 'Collection of classic board games for family fun', 49.99, NULL, 0, 'https://images.pexels.com/photos/1679618/pexels-photo-1679618.jpeg', (SELECT id FROM category_lookup WHERE name = 'Toys & Games'), 'Hasbro', 4.6, 1543, true, 150, ARRAY['4 games included', 'Ages 8+', '2-6 players'], ARRAY['board game', 'family', 'entertainment'], false),
  ('Remote Control Car', 'High-speed RC car with rechargeable battery', 79.99, 99.99, 20, 'https://images.pexels.com/photos/163407/toy-car-red-toys-child-163407.jpeg', (SELECT id FROM category_lookup WHERE name = 'Toys & Games'), 'Traxxas', 4.7, 876, true, 95, ARRAY['35+ mph speed', 'All-terrain', 'Waterproof'], ARRAY['rc', 'outdoor', 'remote control'], true),
  
  -- Beauty & Personal Care
  ('Skincare Set Premium', 'Complete skincare routine with natural ingredients', 89.99, 119.99, 25, 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg', (SELECT id FROM category_lookup WHERE name = 'Beauty & Personal Care'), 'The Ordinary', 4.7, 2341, true, 120, ARRAY['Natural ingredients', 'Complete routine', 'All skin types'], ARRAY['skincare', 'beauty', 'natural'], true),
  ('Hair Dryer Professional', 'Ionic hair dryer with multiple heat settings', 129.99, NULL, 0, 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg', (SELECT id FROM category_lookup WHERE name = 'Beauty & Personal Care'), 'Dyson', 4.8, 1876, true, 60, ARRAY['Ionic technology', 'Fast drying', 'Cool shot'], ARRAY['hair care', 'styling', 'professional'], false),
  ('Makeup Brush Set', 'Professional 12-piece makeup brush collection', 39.99, 59.99, 33, 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', (SELECT id FROM category_lookup WHERE name = 'Beauty & Personal Care'), 'Morphe', 4.6, 3214, true, 200, ARRAY['Synthetic bristles', 'Travel case', 'Vegan'], ARRAY['makeup', 'brushes', 'professional'], true),
  
  -- Automotive
  ('Car Vacuum Cleaner', 'Powerful cordless vacuum for car interiors', 59.99, 79.99, 25, 'https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg', (SELECT id FROM category_lookup WHERE name = 'Automotive'), 'Black+Decker', 4.5, 1234, true, 150, ARRAY['Cordless', 'HEPA filter', 'Multiple attachments'], ARRAY['cleaning', 'car care', 'vacuum'], true),
  ('Car Phone Mount', 'Universal magnetic phone holder for dashboard', 19.99, 29.99, 33, 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg', (SELECT id FROM category_lookup WHERE name = 'Automotive'), 'iOttie', 4.4, 5678, true, 500, ARRAY['360° rotation', 'Strong magnet', 'Universal fit'], ARRAY['phone mount', 'accessory', 'convenience'], true),
  ('Jump Starter Kit', 'Portable battery pack for emergency car starting', 89.99, NULL, 0, 'https://images.pexels.com/photos/3836407/pexels-photo-3836407.jpeg', (SELECT id FROM category_lookup WHERE name = 'Automotive'), 'NOCO', 4.7, 987, true, 75, ARRAY['2000A peak current', 'USB charging', 'LED flashlight'], ARRAY['emergency', 'battery', 'safety'], false),
  ('Car Dash Cam', 'Full HD dashboard camera with night vision', 119.99, 149.99, 20, 'https://images.pexels.com/photos/6419122/pexels-photo-6419122.jpeg', (SELECT id FROM category_lookup WHERE name = 'Automotive'), 'Garmin', 4.6, 1543, true, 90, ARRAY['1080p HD', 'Night vision', 'Loop recording'], ARRAY['dash cam', 'safety', 'recording'], true)
) AS products;