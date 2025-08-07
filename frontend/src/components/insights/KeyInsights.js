import React from 'react';

const KeyInsights = ({ summary }) => {
    const getScore = () => {
        if (typeof summary.diversificationScore === 'string') {
            return parseFloat(summary.diversificationScore.split('/')[0]);
        }
        if (typeof summary.diversificationScore === 'number') {
            return summary.diversificationScore;
        }
        return 0;
    };

    const score = getScore();
    const circumference = 2 * Math.PI * 15.9155;
    const offset = circumference - (score / 10) * circumference;

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-medium text-green-600">Biggest Winner</h3>
                    <p className="text-xl font-bold mt-2">{summary.topPerformer.name}</p>
                    <p className="text-md mt-1 text-green-600">Gain: +{summary.topPerformer.gainPercent.toFixed(2)}%</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-medium text-red-600">Biggest Loser</h3>
                    <p className="text-xl font-bold mt-2">{summary.worstPerformer.name}</p>
                    <p className="text-md mt-1 text-red-600">Loss: {summary.worstPerformer.gainPercent.toFixed(2)}%</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
                    <h3 className="text-lg font-medium mb-2">Diversification Score</h3>
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                            <path className="text-gray-200" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="text-indigo-600" strokeWidth="3" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray={`${circumference}, ${circumference}`} style={{strokeDashoffset: offset}} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">{score}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
                    <h3 className="text-lg font-medium mb-4">Risk Level</h3>
                    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-lg font-semibold">{summary.riskLevel}</div>
                </div>
            </div>
        </section>
    );
};
export default KeyInsights;
