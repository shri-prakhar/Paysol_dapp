import { ed25519 } from "@noble/curves/ed25519.js";
import {  useWallet } from "@solana/wallet-adapter-react";
import { useRef, useState } from "react";

export default function SignMessage() {
    const messageeRef = useRef<HTMLInputElement | null>(null);
    const wallet = useWallet();
    const [isLoading , Setloading] = useState(false)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const messagestr = messageeRef.current?.value.trim() as string;
   
        if(!messagestr){
            alert ("enter Message")
            return ;
        }
        if (!wallet.publicKey){
            alert("Please connect your wallet")
            return
        }
        const message  = new TextEncoder().encode(messagestr) 
        
        Setloading(true)
        try {
            if(wallet?.signMessage){
                const signature = await wallet.signMessage(message)
                if (ed25519.verify(signature , message , wallet.publicKey.toBytes())){
                    alert("Message signed successful");
                }else{
                    alert("Failed to sign message ")
                }

            }
            
            
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed. Please try again.");
        } finally {
            Setloading(false);
        }


        }

    return (
         
            <form onSubmit={handleSubmit} className="p-8 rounded-lg bg-gray-800 shadow-md w-140 ">
                <h2 className="text-xl font-semibold text-white text-center mb-4">Sign a Message </h2>
                <input
                    type="text"
                    placeholder="Type a message to verify"
                    ref={messageeRef}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md text-white font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 text-white font-semibold rounded-md transition-all duration-300 ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-800 cursor-pointer'}`}
                >
                    {isLoading ? (
                        <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
                    ) : (
                        "Sign"
                    )}
                </button>
        </form>
    );
}
