package com.msproducts.fuelApp;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.graphics.Insets;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        edgeToEdgeHandler();
    }

    private void edgeToEdgeHandler() {
        ViewCompat.setOnApplyWindowInsetsListener(this.bridge.getWebView(), (v, windowInsets) -> {
            Insets insets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() |
                WindowInsetsCompat.Type.displayCutout() |
                WindowInsetsCompat.Type.ime()
            );

            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.VANILLA_ICE_CREAM) {
                // For devices < API 35 → apply layout margins
                ViewGroup.MarginLayoutParams mlp = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
                mlp.leftMargin = insets.left;
                mlp.bottomMargin = insets.bottom;
                mlp.rightMargin = insets.right;
                mlp.topMargin = insets.top;
                v.setLayoutParams(mlp);
            } else {
                // For API 35+ → manually set safe area CSS variables
                WebView view = this.bridge.getWebView();
                float density = getApplicationContext().getResources().getDisplayMetrics().density;

                view.evaluateJavascript(String.format(
                    "document.documentElement.style.setProperty('--android-safe-area-top', '%spx')",
                    Math.round(insets.top / density)), null);

                view.evaluateJavascript(String.format(
                    "document.documentElement.style.setProperty('--android-safe-area-left', '%spx')",
                    Math.round(insets.left / density)), null);

                view.evaluateJavascript(String.format(
                    "document.documentElement.style.setProperty('--android-safe-area-right', '%spx')",
                    Math.round(insets.right / density)), null);

                view.evaluateJavascript(String.format(
                    "document.documentElement.style.setProperty('--android-safe-area-bottom', '%spx')",
                    Math.round(insets.bottom / density)), null);
            }

            return WindowInsetsCompat.CONSUMED;
        });
    }
}
