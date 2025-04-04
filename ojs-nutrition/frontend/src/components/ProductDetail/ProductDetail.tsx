import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Grid,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Product } from "../../types/Product";
import { Variant } from "../../types/Variant";
import { Size } from "../../types/Size";
import { ProductRating } from "./ProductRating";
import { ProductHeader } from "./ProductHeader";
import { FlavorSelector } from "./FlavorSelector";
import { SizeSelector } from "./SizeSelector";
import { SelectedInfo } from "./SelectedInfo";
import { ProductImage } from "./ProductImage";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CommentSection } from "./CommentSection";

export interface ProductDetailsProps {
  product: Product;
  discountPercentage?: number;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    product.Variants?.[0]?.flavor ?? ""
  );
  const [selectedSize, setSelectedSize] = useState<Size | null>(
    product.Variants?.[0]?.Sizes[0] ?? null
  );
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    product.Variants?.[0]?.photo_src || "Resim bulunamadı"
  );
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.Variants?.[0] ?? null
  );
  const tags: string[] = product.tags ? JSON.parse(product.tags) : [];

  const groupedVariants = useMemo(() => {
    return product.Variants?.reduce<Record<string, Variant[]>>(
      (acc, variant) => {
        const flavor = variant.flavor;
        if (!acc[flavor]) {
          acc[flavor] = [];
        }
        acc[flavor].push(variant);
        return acc;
      },
      {}
    );
  }, [product.Variants]);

  const availableSizes = useMemo(() => {
    if (!selectedFlavor || !groupedVariants) return [];

    const sizes = groupedVariants[selectedFlavor].flatMap(
      (variant) => variant.Sizes
    );

    const uniqueSizes = Array.from(
      new Map(
        sizes
          .map((size) => [size.gram, size])
          .filter((entry): entry is [number, Size] => entry[0] !== undefined)
      ).values()
    );

    return uniqueSizes.sort((a, b) => a.gram! - b.gram!);
  }, [selectedFlavor, groupedVariants]);

  const handleFlavorSelect = (flavor: string, firstSize: Size) => {
    setSelectedFlavor(flavor);
    if (
      !selectedSize ||
      !availableSizes.some((s) => s.gram === selectedSize.gram)
    ) {
      setSelectedSize(firstSize);
    }
  };

  useEffect(() => {
    const currentVariant = product.Variants?.find(
      (variant) =>
        variant.flavor === selectedFlavor &&
        variant.Sizes.some((size) => size.gram === selectedSize?.gram)
    );
    setSelectedVariant(currentVariant || null);
    const photo = currentVariant?.photo_src || "";
    setSelectedPhoto(photo);
  }, [selectedFlavor, selectedSize, product.Variants]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Grid container spacing={2}>
        {/* Görsel Kısmı - 7/12 alan */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              marginTop:  "-130px",
            }}
          >
            <ProductImage
              product={product}
              selectedPhoto={selectedPhoto}
              discountPercentage={
                selectedVariant?.PriceInfos[0]?.discount_percentage ?? null
              }
            />
          </Box>
        </Grid>

        {/* Detay Kısmı - 5/12 alan */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              height: "100%",
            }}
          >
<ProductRating commentCount={product.Reviews?.length ?? 0} />
<ProductHeader
              name={product.name || ""}
              shortExplanation={product.short_explanation || ""}
              tags={tags}
            />

            <Divider sx={{ margin: "8px 0" }} />

            {groupedVariants && (
              <FlavorSelector
                groupedVariants={groupedVariants}
                selectedFlavor={selectedFlavor}
                onFlavorSelect={handleFlavorSelect}
              />
            )}

            {availableSizes.length > 0 && (
              <SizeSelector
                availableSizes={availableSizes}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
              />
            )}

            {selectedFlavor && selectedSize && selectedVariant && (
              <Box sx={{ position: "relative" }}>
                <SelectedInfo
                  selectedFlavor={selectedFlavor}
                  selectedSize={selectedSize}
                  priceInfo={selectedVariant.PriceInfos[0]} // PriceInfos olarak düzeltildi
                  selectedVariant={selectedVariant} // Eksik alan düzeltildi
                  id={product.id}
                  productName={product.name}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                    marginTop: "25px",
                  }}
                >
                  {/* Divider */}
                  <Divider />

                  {/* Son Kullanma Tarihi */}
                  <Typography variant="body2" mt={3}>
                    Son Kullanma Tarihi: 07.2025
                  </Typography>

                  {/* Accordion Sections */}
                  <Accordion sx={{ boxShadow: "none" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600 }}>
                        ÖZELLİKLER
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{product.features}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Divider />

                  <Accordion sx={{ boxShadow: "none" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600 }}>
                        BESİN İÇERİĞİ
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{product.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Divider />

                  <Accordion sx={{ boxShadow: "none" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600 }}>
                        KULLANIM ŞEKLİ
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{product.usage}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <CommentSection productId={product.id} />
    </Box>
  );
};
