package com.msproducts.fuelApp;

import android.content.IntentSender;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebView;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;

import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.UpdateAvailability;

public class MainActivity extends BridgeActivity {

    private static final int UPDATE_REQUEST_CODE = 123;
    private AppUpdateManager appUpdateManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        edgeToEdgeHandler();

        checkAppUpdate();
    }

    // ✅ CHANGED: protected → public
    @Override
    public void onResume() {
        super.onResume();
        
        // Check if update was downloaded while app was in background
        if (appUpdateManager != null) {
            appUpdateManager
                .getAppUpdateInfo()
                .addOnSuccessListener(appUpdateInfo -> {
                    if (appUpdateInfo.updateAvailability() == UpdateAvailability.DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS) {
                        // If an in-app update is already running, resume the update.
                        startUpdate(appUpdateInfo, AppUpdateType.IMMEDIATE);
                    }
                });
        }
    }

    // ---------------------------------------------
    // 🚀 In-App Update Code
    // ---------------------------------------------
    private void checkAppUpdate() {
        appUpdateManager = AppUpdateManagerFactory.create(this);

        appUpdateManager
                .getAppUpdateInfo()
                .addOnSuccessListener(appUpdateInfo -> {

                    if (appUpdateInfo.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE) {

                        // Use IMMEDIATE for mandatory updates
                        if (appUpdateInfo.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE)) {
                            startUpdate(appUpdateInfo, AppUpdateType.IMMEDIATE);
                        }
                        // Flexible update (Bottom banner style update popup)
                        else if (appUpdateInfo.isUpdateTypeAllowed(AppUpdateType.FLEXIBLE)) {
                            startUpdate(appUpdateInfo, AppUpdateType.FLEXIBLE);
                        }
                    }
                });
    }

    private void startUpdate(AppUpdateInfo appUpdateInfo, int updateType) {
        try {
            appUpdateManager.startUpdateFlowForResult(
                    appUpdateInfo,
                    updateType,
                    this,
                    UPDATE_REQUEST_CODE
            );
        } catch (IntentSender.SendIntentException e) {
            e.printStackTrace();
        }
    }

    // ---------------------------------------------
    // Required callback
    // ---------------------------------------------
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable android.content.Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == UPDATE_REQUEST_CODE) {
            if (resultCode != RESULT_OK) {
                // Update failed or canceled by user
                // For IMMEDIATE updates, you can retry here
                checkAppUpdate();
            }
        }
    }

    // ---------------------------------------------
    // Existing Safe-area (Edge-to-Edge) Code
    // ---------------------------------------------
    private void edgeToEdgeHandler() {
        ViewCompat.setOnApplyWindowInsetsListener(this.bridge.getWebView(), (v, windowInsets) -> {
            Insets insets = windowInsets.getInsets(
                    WindowInsetsCompat.Type.systemBars() |
                            WindowInsetsCompat.Type.displayCutout() |
                            WindowInsetsCompat.Type.ime()
            );

            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.VANILLA_ICE_CREAM) {
                ViewGroup.MarginLayoutParams mlp = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
                mlp.leftMargin = insets.left;
                mlp.bottomMargin = insets.bottom;
                mlp.rightMargin = insets.right;
                mlp.topMargin = insets.top;
                v.setLayoutParams(mlp);
            } else {
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