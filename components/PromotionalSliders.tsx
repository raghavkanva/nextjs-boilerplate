import PromoBannerSlider from "./PromoBannerSlider";
import { PromotionSliderProvider } from "./PromotionSliderContext";
import ThinPromotionHeaderSlider from "./ThinPromotionHeaderSlider";

export default function PromotionSliders() {
  return (
    <PromotionSliderProvider>
      <ThinPromotionHeaderSlider />
      <PromoBannerSlider />
    </PromotionSliderProvider>
  );
}