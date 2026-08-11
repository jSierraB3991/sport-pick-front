import { Plus, Trophy } from "lucide-react";
import LoadingBarComponent from "../../components/loading_bar_component";
import { useState } from "react";
import { useToast } from "../../contexts/tast_contexts";
import { getChallengeHome } from "../../api/public_api";
import { ChallengeResponse } from "../../models/challenges_models";
import GenericModalComponent from "../../components/modal/generic_modal_component";
import BuyChallengeModalBody from "../../components/modal/modal_body/buy_challenge_modal_body";

const ChallengeUserPage = () => {
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showModalBuyChallenge, setShowModalBuyChallenge] = useState(false);
    const [dataPass, setDataPass] = useState<ChallengeResponse[]>([]);

    const handleAddChallenge = async () => {
        try {
            const data = await getChallengeHome();
            setDataPass(data);
            setShowModalBuyChallenge(true);
        } catch (error) {
            let message = "";
            if (error instanceof Error && "response" in error) {
                const axiosError = error as any;
                message = axiosError.response?.data?.message || "Ocurrió un error desconocido";
            } else {
                message = "Ocurrió un error inesperado";
            }
            showToast({
                type: "error",
                message: message,
                duration: 0,
                isShowRecharge: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <GenericModalComponent title="Comprar desafío" isOpen={showModalBuyChallenge} onClose={() => setShowModalBuyChallenge(false)}>
                <BuyChallengeModalBody challenges={dataPass} />
            </GenericModalComponent>
            {isLoading && <LoadingBarComponent />}
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
                <div className="pt-10 max-w-2xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-2xl min-h-[500px] flex flex-col items-center justify-center text-center px-6">
                        <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center mb-6">
                            <Trophy size={40} className="text-slate-400" />
                        </div>

                        <h2 className="text-2xl font-semibold text-white mb-2">Sin desafíos</h2>

                        <p className="text-slate-400 max-w-sm">Aún no tienes desafíos disponibles. Vuelve más tarde para descubrir nuevas oportunidades.</p>
                    </div>
                </div>
            </div>
            <button
                onClick={handleAddChallenge}
                className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500 text-white shadow-2xl transition hover:bg-teal-600 hover:scale-105 active:scale-95">
                <Plus size={28} />
            </button>
        </>
    );
};

export default ChallengeUserPage;
