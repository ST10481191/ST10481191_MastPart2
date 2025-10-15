export type Course = 'Appetizers' | 'Entrees' | 'Desserts' | 'Beverages';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: string;
};