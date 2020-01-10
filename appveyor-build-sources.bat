@ECHO OFF
IF EXIST calypso_hash (
    make checks
    make build-desktop
) ELSE (
    make build-source CONFIG_ENV=release
)