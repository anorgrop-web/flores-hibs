export function TechnicalDataSection() {
  return (
    <section className="bg-[#3d6f5f] py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-[#3d6f5f] mb-4">Technical Data Sheet: Rare Hibiscus Varieties.</h2>
          <p className="text-gray-700 mb-8">
            For your maximum cultivation success, we've put together a complete guide with everything you need to know
            about these spectacular flowers.
          </p>

          <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Scientific Name</div>
              <div className="p-4 md:col-span-2">
                <span className="italic">Hibiscus sp.</span> (Genus <span className="text-red-600">Hibiscus</span>)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Common Names</div>
              <div className="p-4 md:col-span-2">
                <span className="text-red-600">Hibiscus</span>, Rose Mallow
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Origin</div>
              <div className="p-4 md:col-span-2">
                <span className="text-blue-600">Asia & Pacific Islands</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Flower Colors</div>
              <div className="p-4 md:col-span-2">
                Our kits contain healthy young plants of rare varieties with exotic and vibrant color combinations.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Ideal Planting Season</div>
              <div className="p-4 md:col-span-2">
                <span className="text-blue-600">All year round.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Flowering Season</div>
              <div className="p-4 md:col-span-2">
                <span className="text-red-600">Mainly in Summer & Fall.</span> In warm climates, can bloom year-round.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Light Requirements</div>
              <div className="p-4 md:col-span-2">
                <span className="text-blue-600">Full Spectrum.</span> Requires 4-6 hours of direct sun or equivalent
                artificial light daily.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Watering</div>
              <div className="p-4 md:col-span-2">Regular. Keep the soil consistently moist, but never waterlogged.</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Soil Type</div>
              <div className="p-4 md:col-span-2">
                Fertile, well-draining, and rich in organic matter. Slightly acidic (pH 6.5-6.8).
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Plant Height</div>
              <div className="p-4 md:col-span-2">
                From 1.5 to 6.5 feet, depending on the variety and pruning.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Life Cycle</div>
              <div className="p-4 md:col-span-2">Perennial</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-4 font-semibold bg-gray-50">Attracts</div>
              <div className="p-4 md:col-span-2">
                <span className="font-semibold">Hummingbirds and Butterflies</span>, bringing more life to your garden.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">US Growing Guide</h2>
          <p className="text-gray-700 mb-8">
            Our rare <span className="text-red-600">Hibiscus</span> varieties can bring a touch of the tropics to
            gardens all across the United States. With the right care, you can achieve stunning results.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ideal for Planting Directly in the Garden:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <span className="text-blue-600">
                    USDA Zones 9-11: Florida, Southern Texas, Southern California, Hawaii, Louisiana
                  </span>
                  , etc.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect for Patios & Containers (in Pots):</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <span className="text-blue-600">
                    USDA Zones 5-8: Northeast, Midwest, Pacific Northwest, Mid-Atlantic, Mountain States
                  </span>
                  , etc.
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="text-gray-800">
                <span className="font-bold">Pro Tip:</span> In cooler zones, simply bring your potted Hibiscus
                indoors to a bright spot before the first frost to enjoy its beauty year after year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
