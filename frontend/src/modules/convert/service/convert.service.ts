import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getAllPairsToConvert(){
    const response = await axios.get(`${BASE_URL}/list-all-covert-pairs`)
    const grouped = response.data.reduce((acc:any, item:any) => {
        const key = item.fromAsset?.trim();
      
        if (!key) return acc;
      
        if (!acc[key]) {
          acc[key] = [];
        }
      
        acc[key].push(item);
        return acc;
      }, {});
    return grouped;

}