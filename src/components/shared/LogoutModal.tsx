"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
                <LogOut className="h-4 w-4" />
            </div>
            Confirm Logout
          </DialogTitle>
          <DialogDescription className="pt-2 text-[14px] text-slate-500">
            Are you sure you want to log out of your account? You will need to sign in again to access the dashboard.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="h-10 border-slate-200 font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="h-10 bg-red-500 cursor-pointer font-bold text-white shadow-md shadow-red-100 transition-all hover:bg-red-600 hover:scale-[1.01] active:scale-[0.99]"
          >
            Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
