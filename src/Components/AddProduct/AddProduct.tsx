import { Grid } from "@mui/material";
import { convertToRaw, EditorState } from "draft-js";
import { FormEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../features/products/productsApi";
import {
  errorMessage,
  successMessage,
} from "../../Services/Utils/toastMessages";
import { CardWrapper, PFormLabel } from "../../Styles/panelCommon";
import TextEditor from "../TextEditor/TextEditor";
import ContentHeader from "./ContentHeader/ContentHeader";
import Details from "./Details/Details";
import Gallery from "./Gallery/Gallery";
import Sidebar from "./Sidebar/Sidebar";

export interface IImages {
  main: string;
}
export interface ITag {
  id: string;
  name: string;
}

function AddProduct() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredSku, setEnteredSku] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("apple");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [enteredShortDesc, setEnteredShortDesc] = useState("");
  const [addedImages, setAddedImages] = useState<any>({});
  const [enteredPrice, setEnteredPrice] = useState<number | string>("");
  const [enteredOffPrice, setEnteredOffPrice] = useState<number | string>("");
  const [enteredQuantity, setEnteredQuantity] = useState<number | string>("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState("audio & video game");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let galleryList = [];
    for (let img in addedImages) {
      galleryList.push({ image: addedImages[img] });
    }
    let tagList = tags.map((t) => t.name);
    const newProduct = {
      title: enteredTitle,
      image: addedImages?.main,
      gallery: galleryList,
      price: +enteredPrice,
      offPrice: +enteredOffPrice,
      sku: enteredSku,
      tags: tagList,
      quantity: +enteredQuantity,
      colors: selectedColors,
      category: selectedCategory,
      shortDescription: enteredShortDesc,
      fullDescription: JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      ),
      rating: 5,
    };
    console.log(newProduct);

    try {
      const response = await addProduct(newProduct).unwrap();
      successMessage(response?.message);
      navigate("/panel/products/list", { replace: true });
      console.log(response);
    } catch (err: any) {
      errorMessage(err.message);
      console.log(err);
    }
  };
  const checkKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Enter") event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ContentHeader title={"add product"} />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12} md={8}>
            <Details
              enteredTitle={enteredTitle}
              setEnteredTitle={setEnteredTitle}
              enteredSku={enteredSku}
              setEnteredSku={setEnteredSku}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              enteredShortDesc={enteredShortDesc}
              setEnteredShortDesc={setEnteredShortDesc}
            />
            <Gallery
              setAddedImages={setAddedImages}
              addedImages={addedImages}
            />
            <CardWrapper mt={4}>
              <PFormLabel sx={{ display: "block", ml: "5px", mb: "10px" }}>
                description
              </PFormLabel>
              <TextEditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </CardWrapper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Sidebar
              enteredPrice={enteredPrice}
              setEnteredPrice={setEnteredPrice}
              enteredOffPrice={enteredOffPrice}
              setEnteredOffPrice={setEnteredOffPrice}
              enteredQuantity={enteredQuantity}
              setEnteredQuantity={setEnteredQuantity}
              tags={tags}
              setTags={setTags}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddProduct;
