import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { axiosBasic } from "../../../hooks/useAxios";
import useCart from "../../../hooks/useCart";

function FoodCard({ item }) {
  const { user } = useAuth();
  const axiosSecure = axiosBasic;
  const { name, image, price, recipe, _id } = item;
  const navigate = useNavigate();
  const [, refetch] = useCart();

  const handleAddToCart = async (food) => {
    if (user && user.email) {
      // send cart item to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      try {
        const result = await axiosBasic.post("/carts", cartItem);
        result.data;
        toast.success("Item Added to Cart");
        refetch();
      } catch (error) {
        error;
        toast.error("Error while adding item to cart");
      }
    } else {
      toast.error("No User Detected, Login");
      navigate("/login");
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p>${price}</p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button onClick={handleAddToCart} className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
