import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { products } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { dispatch } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((fav: string) => fav !== id);
      toast({
        title: "Removed from Favorites",
        description: "Product removed from your favorites",
      });
    } else {
      newFavorites = [...favorites, id];
      toast({
        title: "Added to Favorites",
        description: "Product added to your favorites",
      });
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (product) {
      // Add items to cart based on quantity
      for (let i = 0; i < quantity; i++) {
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
          }
        });
      }
      
      toast({
        title: "Added to Cart",
        description: `${quantity} x ${product.name} added to your cart`,
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/checkout')}
            className="ml-2"
          >
            View Cart
          </Button>
        ),
      });
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-muted rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <Badge className="mb-4">{product.category}</Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 break-words">{product.name}</h1>
            <p className="text-2xl sm:text-3xl font-bold text-primary mb-6">R{product.price}</p>
            
            <p className="text-muted-foreground mb-6 leading-relaxed break-words">
              {product.description}
            </p>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Benefits:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ 100% Natural & Organic Ingredients</li>
                  <li>✓ No Harmful Chemicals or Additives</li>
                  <li>✓ Sustainably Sourced & Eco-Friendly</li>
                  <li>✓ Cruelty-Free & Vegan</li>
                  <li>✓ Made in South Africa</li>
                </ul>
              </CardContent>
            </Card>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleAddToCart} size="lg" className="flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - R{(product.price * quantity).toLocaleString()}
                </Button>
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="lg"
                  onClick={toggleFavorite}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* IBO Info */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>IBOs:</strong> Earn 20-30% commission on every sale of this product!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                    <p className="text-xl font-bold text-primary">R{relatedProduct.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
