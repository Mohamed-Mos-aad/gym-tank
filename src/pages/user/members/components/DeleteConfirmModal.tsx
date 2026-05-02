"use client";

import Modal from "@/components/popUp/Modal";
import Button from "@/components/ui/Button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    loading?: boolean;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName, loading }: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <Modal>
            <div className="flex flex-col items-center gap-6 p-4 text-center">
                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500 animate-bounce">
                    <AlertTriangle size={40} />
                </div>
                
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-black text-neutral-900">هل أنت متأكد؟</h1>
                    <p className="text-neutral-500 font-bold leading-relaxed">
                        أنت على وشك حذف العضو <span className="text-red-600">"{itemName}"</span>. <br />
                        هذا الإجراء سيقوم بمسح كافة بيانات العضو وسجلاته نهائياً.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                    <Button
                        variant="primary"
                        className="flex-1 py-4 rounded-2xl font-black bg-red-600 border-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "جاري الحذف..." : "نعم، احذف العضو"}
                    </Button>
                    <Button
                        variant="guest"
                        className="flex-1 py-4 rounded-2xl font-black border-neutral-200"
                        onClick={onClose}
                        disabled={loading}
                    >
                        تراجع
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
