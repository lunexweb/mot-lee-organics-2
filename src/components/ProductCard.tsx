import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const ProductCard = ({ id, name, price, category, image, description }: ProductCardProps) => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/product/${id}`)}>
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground mb-1 truncate">{category}</div>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[2.5rem]">{description}</p>
        <p className="text-xl font-bold text-primary">R{price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: 'ADD_ITEM',
              payload: {
                id,
                name,
                price,
                image,
                category
              }
            });
            toast({
              title: "Added to Cart",
              description: `${name} added to your cart`,
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
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
