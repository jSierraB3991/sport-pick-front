import { useEffect, useState } from "react";
import { ChallengeResponse, PriceChallenges } from "../../../models/challenges_models";

type ChallengeBodyProps = {
    challenges: ChallengeResponse[];
};

const Info = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex flex-col">
        <span className="text-slate-400">{label}</span>
        <span className="text-white font-medium">{value}</span>
    </div>
);

const BuyChallengeModalBody = ({ challenges }: ChallengeBodyProps) => {
    const [selectedChallenge, setSelectedChallenge] = useState<ChallengeResponse | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<PriceChallenges | null>(null);

    useEffect(() => {}, []);
    return (
        <div className="max-h-[70vh] overflow-y-auto">
            {/* Progress */}
            <div className="relative mb-8">
                {/* Líneas */}
                <div className="absolute top-4 left-[16.66%] right-[16.66%] h-0.5 bg-slate-700 -z-10" />

                <div className="grid grid-cols-3">
                    {/* Paso 1 */}
                    <div className="flex flex-col items-center">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold ${
                                !selectedChallenge ? "bg-teal-500 text-white" : "bg-teal-500 text-white"
                            }`}>
                            1
                        </div>

                        <span className={`mt-2 text-sm font-medium ${!selectedChallenge ? "text-teal-400" : "text-teal-500"}`}>Desafío</span>
                    </div>

                    {/* Paso 2 */}
                    <div className="flex flex-col items-center">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold ${
                                selectedChallenge ? "bg-teal-500 text-white" : "bg-slate-700 text-slate-400"
                            }`}>
                            2
                        </div>

                        <span className={`mt-2 text-sm font-medium ${selectedChallenge ? "text-teal-400" : "text-slate-500"}`}>Capital</span>
                    </div>

                    {/* Paso 3 */}
                    <div className="flex flex-col items-center">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold ${
                                selectedPrice ? "bg-teal-500 text-white" : "bg-slate-700 text-slate-400"
                            }`}>
                            3
                        </div>

                        <span className={`mt-2 text-sm font-medium whitespace-nowrap ${selectedPrice ? "text-teal-400" : "text-slate-500"}`}>Confirmar</span>
                    </div>
                </div>
            </div>

            {/* STEP 1 */}
            {!selectedChallenge && (
                <div className="space-y-4">
                    {challenges.map((challenge) => (
                        <button
                            key={challenge.name}
                            onClick={() => setSelectedChallenge(challenge)}
                            className="w-full rounded-2xl border border-slate-700 bg-slate-800/70 p-5 text-left transition-all hover:border-teal-500 hover:bg-slate-700 hover:shadow-lg">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white">{challenge.name}</h3>

                                    <p className="mt-2 max-h-24 overflow-y-auto pr-2 text-sm leading-5 text-slate-400">{challenge.description}</p>
                                </div>

                                <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">→</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* STEP 2 */}
            {selectedChallenge && !selectedPrice && (
                <>
                    <button onClick={() => setSelectedChallenge(null)} className="text-teal-400 mb-4 hover:underline">
                        ← Cambiar desafío
                    </button>

                    <div className="space-y-4">
                        {selectedChallenge.price_challenge.map((price) => (
                            <button
                                key={price.id}
                                onClick={() => setSelectedPrice(price)}
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 hover:border-teal-500 hover:bg-slate-700 transition p-5 text-left">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Capital</span>

                                    <span className="text-teal-400 font-bold">${price.grow.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between mt-2">
                                    <span className="text-slate-400">Precio</span>

                                    <span className="text-white font-semibold">${price.price.toLocaleString()}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {/* STEP 3 */}
            {selectedChallenge && selectedPrice && (
                <>
                    <button onClick={() => setSelectedPrice(null)} className="text-teal-400 mb-4 hover:underline">
                        ← Cambiar capital
                    </button>

                    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                        <h3 className="text-2xl text-white font-bold">{selectedChallenge.name}</h3>

                        <div className="mt-4 flex justify-between">
                            <span className="text-slate-400">Capital</span>
                            <span className="text-teal-400 font-bold">${selectedPrice.grow.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between mt-2">
                            <span className="text-slate-400">Precio</span>
                            <span className="text-white font-bold">${selectedPrice.price.toLocaleString()}</span>
                        </div>

                        <div className="mt-6 space-y-4">
                            {selectedPrice.steps.map((step) => (
                                <div key={step.step} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                                    <h4 className="text-white font-semibold mb-4">{step.step.replace("_", " ")}</h4>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <Info label="Selecciones mínimas" value={step.selection_minimun_count} />
                                        <Info label="Selecciones máximas" value={step.selection_maximun_count} />
                                        <Info label="Mínimo requerido" value={step.minimun_selections} />
                                        <Info label="Pérdida máxima" value={step.maximun_lose} />
                                        <Info label="Pérdida diaria" value={step.maximun_lose_daily} />
                                        <Info label="Objetivo" value={step.benefit_target} />
                                        <Info label="Tiempo límite" value={step.time_limit} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="mt-6 w-full rounded-xl bg-teal-500 py-3 font-semibold text-white hover:bg-teal-600 transition">
                            Comprar desafío
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
export default BuyChallengeModalBody;
