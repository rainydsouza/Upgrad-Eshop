import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { DeleteForever, Edit } from "@material-ui/icons";
import useAdmin from "../AuthUser/User";
import PopUp from "./Popup";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../AuthUser/Auth";

export default function ProductCard({ product, setAdminError }) {
  const admin = useAdmin();
  console.log("Admin in Product Card", admin);
  const auth = useAuth();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Card
        sx={{ maxWidth: 345, minWidth: "100%" }}
        className="group cursor-pointer"
      >
        <div className="h-[430px] lg:h-[355px] w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt="Paella dish"
            className="h-full  w-full object-cover group-hover:scale-110 transition-all"
          />
        </div>

        <CardContent>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{product.name}</h2>
            <h2>₹ {product.price}</h2>
          </div>
          <Typography variant="body2" color="text.secondary">
            {product.description.length > 30
              ? product.description.slice(0, 30) + "..."
              : product.description}
          </Typography>
        </CardContent>
        <div className="flex items-center justify-between w-full px-2 py-3">
          <Button
            variant="contained"
            onClick={() => {
              if (!auth) {
                history.push("/auth/login/");
              } else {
                history.push("/product/" + product.id);
              }
            }}
          >
            Buy
          </Button>

          {admin && (
            <div>
              <IconButton
                aria-label="Remove Product"
                onClick={() => {
                  history.push("/product/update/" + product.id);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="Remove Product"
                onClick={() => setOpen(true)}
              >
                <DeleteForever />
              </IconButton>
            </div>
          )}
        </div>
      </Card>
      <PopUp open={open} setOpen={setOpen} product_id={product.id} />
    </div>
  );
}
