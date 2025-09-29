import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export default function CurrentBalance() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [isLoading, setLoading] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!wallet.publicKey) {
            alert("Please connect your wallet");
            return;
        }

        setLoading(true);
        try {
            const balanceInLamports = await connection.getBalance(wallet.publicKey);
            const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
            setBalance(balanceInSol);
        } catch (error) {
            console.error("Fetching failed:", error);
            alert("Can't fetch the current user balance. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-80">
                <h2 className="text-xl font-semibold text-white text-center mb-4">Get Your Solana Balance</h2>
                
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`w-full py-3 text-white font-semibold rounded-md transition-all duration-300 ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-800 cursor-pointer'}`}
                >
                    {isLoading ? (
                        <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
                    ) : (
                        "Get Current Balance"
                    )}
                </button>

                <div className="mt-6">
                    <p className="text-white text-center">
                        {balance !== null ? (
                            <>Current Balance: <span className="font-bold text-purple-400">{balance} SOL</span></>
                        ) : (
                            <span className="text-gray-400">Please get your balance.</span>
                        )}
                    </p>
                </div>
            </div>
        
    );
}
