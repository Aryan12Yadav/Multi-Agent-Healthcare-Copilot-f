function TypingIndicator() {

    return (
        <div className="flex justify-start mb-6">

            <div className="flex flex-col items-start">

                <span className="text-xs mb-2 text-slate-500 font-medium">

                    MedSphere AI

                </span>

                <div className="bg-white border border-slate-200 rounded-[24px] px-6 py-4 shadow-sm">

                    <div className="flex items-center gap-2">

                        <div className="w-3 h-3 bg-violet-500 rounded-full animate-bounce" />

                        <div className="w-3 h-3 bg-violet-500 rounded-full animate-bounce [animation-delay:0.15s]" />

                        <div className="w-3 h-3 bg-violet-500 rounded-full animate-bounce [animation-delay:0.3s]" />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TypingIndicator;