import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { loadPaystackScript, initializePaystack, generateReference, convertToKobo } from '@/services/paystack';

const Checkout = () => {
  const { state: cartState, dispatch } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  useEffect(() => {
    // Load Paystack script
    loadPaystackScript()
      .then(() => {
        setPaystackLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to load Paystack:', error);
        toast({
          title: "Payment Error",
          description: "Failed to load payment system. Please refresh and try again.",
          variant: "destructive"
        });
      });
  }, [toast]);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const handlePayment = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    if (cartState.items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty",
        variant: "destructive"
      });
      return;
    }

    if (!paystackLoaded) {
      toast({
        title: "Payment System Loading",
        description: "Please wait for the payment system to load",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const reference = generateReference();
      const amountInKobo = convertToKobo(cartState.total);

      const response = await initializePaystack({
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here',
        email,
        amount: amountInKobo,
        currency: 'ZAR',
        reference,
        metadata: {
          cart_items: cartState.items,
          total_amount: cartState.total,
          item_count: cartState.itemCount
        }
      });

      if (response.status) {
        // Payment successful
        dispatch({ type: 'CLEAR_CART' });
        toast({
          title: "Payment Successful!",
          description: "Your order has been placed successfully",
        });
        navigate('/products');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Payment could not be processed",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cartState.items.length === 0) {
    return (
      <div className="bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/products')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Cart ({cartState.itemCount} items)</h2>
            
            {cartState.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold line-clamp-2 break-words">{item.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{item.category}</p>
                      <p className="text-lg font-bold text-primary">R{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R{cartState.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>R0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>R{cartState.total.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={isLoading || !paystackLoaded}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay with Paystack - R{cartState.total.toLocaleString()}
                    </>
                  )}
                </Button>
                
                {!paystackLoaded && (
                  <p className="text-sm text-muted-foreground text-center">
                    Loading payment system...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
