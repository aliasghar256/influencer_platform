import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function Filters() {
  return (
    <div className="w-64 p-4 border-r h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Overall Rating</h3>
          <Slider defaultValue={[70]} min={0} max={99} step={1} />
        </div>
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="lifestyle" />
              <label htmlFor="lifestyle">Lifestyle</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="tech" />
              <label htmlFor="tech">Tech</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="fashion" />
              <label htmlFor="fashion">Fashion</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="gaming" />
              <label htmlFor="gaming">Gaming</label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Platform</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="instagram" />
              <label htmlFor="instagram">Instagram</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="youtube" />
              <label htmlFor="youtube">YouTube</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="tiktok" />
              <label htmlFor="tiktok">TikTok</label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Follower Range</h3>
          <Slider defaultValue={[500000]} min={0} max={10000000} step={100000} />
        </div>
      </div>
    </div>
  )
}

